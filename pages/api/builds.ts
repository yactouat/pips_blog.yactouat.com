import BlogPostPublishedPubSubMessage from "@/lib/interfaces/business/blog-post-published-pubsub-message";
import deletePrevVercelBuilds from "pips_shared/dist/functions/delete-prev-vercel-builds";
import getVercelBuilds from "pips_shared/dist/functions/get-vercel-builds";
import jwtDecode from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from "next";
import postVercelBuild from "@/lib/functions/post-vercel-build";
import sendJsonResponse from "pips_shared/dist/functions/send-json-response";

const comesFromLegitPubsub = (
  req: {
    headers: {
      authorization?: string;
    };
    body: {
      message: {
        data: string;
      };
    };
  },
  expectedPubSubTokenAud: string,
  expectedPubSubTokenEmail: string
): boolean => {
  // pessimistc assumption
  let comesFromLegitPubSub = false;
  // get the Cloud Pub/Sub-generated JWT in the "Authorization" header.
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.substring(7);
  // decode the JWT
  const decodedToken = jwtDecode(token);
  // verifying the claims
  comesFromLegitPubSub =
    (
      decodedToken as {
        aud: string;
      }
    ).aud === expectedPubSubTokenAud &&
    (
      decodedToken as {
        email: string;
      }
    ).email === expectedPubSubTokenEmail;
  return comesFromLegitPubSub;
};

type Data = {
  name: string;
};

const deletePrevBuilds = async (): Promise<void> => {
  const vercelDeployments = (await getVercelBuilds()).filter(
    (dep) => dep.meta.githubRepo == process.env.REPO_NAME
  );
  await deletePrevVercelBuilds(vercelDeployments);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!process.env.BUILDS_TOKEN || !process.env.REPO_NAME) {
    sendJsonResponse(res, 401, "Unauthorized");
    return;
  }
  try {
    if (req.query.key === "deletePrevious") {
      await deletePrevBuilds();
      sendJsonResponse(res, 200, "prev deployments deleted");
      return;
    }
    if (req.method === "GET") {
      const builds = await getVercelBuilds(true);
      sendJsonResponse(
        res,
        200,
        `blog.yactouat.com ${builds.length} latest builds`,
        builds
      );
    } else if (req.method === "POST") {
      // POST request processing
      // validating inbound payload from Google Cloud Pub/Sub
      let pubSubEventWorkflowOk = comesFromLegitPubsub(
        req,
        process.env.PUBSUB_TOKEN_AUDIENCE as string,
        process.env.PUBSUB_TOKEN_EMAIL as string
      );
      const message = JSON.parse(Buffer.from(req.body.message.data, "base64").toString("utf-8"));
      // console.log("Pub/Sub event workflow message", message);
      // posting the build request only if published post
      if (
        pubSubEventWorkflowOk &&
        (message as BlogPostPublishedPubSubMessage).name.startsWith("published")
      ) {
        try {
          // TODO cron job to delete previous builds on blog posts updates
          await deletePrevBuilds();
          await postVercelBuild();
        } catch (error) {
          console.error("Pub/Sub event workflow failed on deleting previous builds and deploying new one");
        }
      }
      // responding to the inbound request so no reties will be attempted
      if (pubSubEventWorkflowOk) {
        console.info("Pub/Sub event workflow outcome OK");
        sendJsonResponse(res, 200, "blog.yactouat.com build triggered");
      } else {
        console.warn(
          "Pub/Sub event workflow outcome KO", 
          `audience: ${process.env.PUBSUB_TOKEN_AUDIENCE}`, 
          `email: ${process.env.PUBSUB_TOKEN_EMAIL}}`,
          `reqAuthHeaders: ${req.headers.authorization}`
        );
        sendJsonResponse(res, 422, "Pub/Sub event workflow outcome KO");
      }
    } else {
      sendJsonResponse(res, 405, "Method not allowed");
    }
  } catch (error) {
    sendJsonResponse(res, 500, "something went wrong");
  }
}
