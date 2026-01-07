export interface GitHubRepositoryRef {
  owner: string;
  repo: string;
}

export interface GitHubActor {
  login: string;
  id: number;
}

export interface GitHubInstallation {
  id: number;
}
