import axios from "axios";
import getVercelBuilds from "pips_shared/dist/functions/get-vercel-builds";
import { VercelDeploymentType as VercelDeployment } from "pips_shared/dist/types";

const postVercelBuild = async (): Promise<boolean> => {
  let buildWentThrough = false;
  try {
    // fetching list of deployments
    const vercelDeployments = (await getVercelBuilds()).filter(
      (dep) => dep.meta.githubRepo == process.env.REPO_NAME
    );
    // console.log("latest vercel deployment", vercelDeployments[0]);
    // looping through deployments to find the latest ready one from GitOps
    for (let i = 0; i < vercelDeployments.length; i++) {
      const deployment: VercelDeployment = vercelDeployments[i];
      // found the latest master branch ready deployment
      if (
        deployment.state == "READY" &&
        deployment.meta.githubCommitRef == "master"
      ) {
        // call for triggering a new build
        const vercelBuildAPICall = await axios({
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          },
          // payload consists of the build command, the name of the project, and the git repo data
          data: {
            // buildCommand: "npm run build",
            gitSource: {
              ref: deployment.meta.githubCommitRef,
              repoId: deployment.meta.githubRepoId,
              type: "github",
            },
            name: process.env.VERCEL_PROJECT,
            target: "production",
          },
          method: "post",
          url: "https://api.vercel.com/v13/deployments",
        });
        const vercelBuildRes = await vercelBuildAPICall.data;
        buildWentThrough = vercelBuildAPICall.status == 200;
        if (!buildWentThrough) {
          // so I can see the logs in the cloud
          console.log("FAILED VERCEL BUILD RES", vercelBuildRes);
        }
        break;
      }
    }
  } catch (error) {
    console.log("new build process failed", error);
  }
  return buildWentThrough;
};

export default postVercelBuild;
