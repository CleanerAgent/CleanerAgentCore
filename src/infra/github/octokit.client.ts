import { Octokit as CoreOctokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

export const Octokit = CoreOctokit.plugin(restEndpointMethods);

/**
 * Octokit com .rest corretamente tipado
 */
export type RestOctokit = InstanceType<typeof Octokit>;
