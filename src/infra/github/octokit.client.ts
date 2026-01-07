import { Octokit as CoreOctokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

export const Octokit = CoreOctokit.plugin(restEndpointMethods);
export type RestOctokit = InstanceType<typeof Octokit>;
