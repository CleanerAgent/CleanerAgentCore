import type { RestOctokit } from "./octokit.client";
import {
  getAppOctokit,
  getInstallationOctokit,
} from "../../app/githubApp";

export function getAdminOctokit(): RestOctokit {
  return getAppOctokit() as RestOctokit;
}

export async function getRepoOctokit(
  installationId: number
): Promise<RestOctokit> {
  return (await getInstallationOctokit(installationId)) as RestOctokit;
}
