import BlogPostPublishedPubSubMessage from "@/lib/interfaces/business/blog-post-published-pubsub-message";
import comesFromLegitPubsub from "pips_shared/dist/functions/comes-from-legit-pubsub";
import decodePubSubMessage from "pips_shared/dist/functions/decode-pubsub-message";
import deletePrevVercelBuilds from "pips_shared/dist/functions/delete-prev-vercel-builds";
import getVercelBuilds from "pips_shared/dist/functions/get-vercel-builds";
import type { NextApiRequest, NextApiResponse } from "next";
import postVercelBuild from "@/lib/functions/post-vercel-build";
import sendJsonResponse from "pips_shared/dist/functions/send-json-response";

type Data = {
  name: string;
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
      // fetching list of deployments
      const vercelDeployments = (await getVercelBuilds()).filter(
        (dep) => dep.meta.githubRepo == process.env.REPO_NAME
      );
      await deletePrevVercelBuilds(vercelDeployments);
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
      const message = decodePubSubMessage(req);
      // console.log("Pub/Sub event workflow message", message);
      // posting the build request only if published post
      if (
        pubSubEventWorkflowOk &&
        (message as BlogPostPublishedPubSubMessage).name.startsWith("published")
      ) {
        try {
          await postVercelBuild();
        } catch (error) {
          console.log("Pub/Sub event workflow Vercel build partly KO");
        }
      }
      // responding to the inbound request so no reties will be attempted
      if (pubSubEventWorkflowOk) {
        console.log("Pub/Sub event workflow outcome OK");
        sendJsonResponse(res, 200, "blog.yactouat.com build triggered");
      } else {
        console.log(
          "Pub/Sub event workflow outcome KO", 
          `audience: ${process.env.PUBSUB_TOKEN_AUDIENCE}`, 
          `email: ${process.env.PUBSUB_TOKEN_EMAIL}}`,
          `message: ${JSON.stringify(message)}`
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
