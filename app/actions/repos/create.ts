import { inject, ResponderParams } from 'denali';
import AuthenticatedAction from '../authenticated';

export default class CreateRepo extends AuthenticatedAction {

  githubApi = inject('service:github-api');

  adminOnly = true;

  async respond({ body }: ResponderParams) {
    let githubRepo = await this.fetchRepoFromGithub(body.fullName);
    let repo = this.db.create('repo', githubRepo);
    await repo.save();
    repo.initialIssueSync();
    this.render(201, repo);
  }

  async fetchRepoFromGithub(fullName: string) {
    let rawRepo = await this.githubApi.get(`repos/${ fullName }`);
    return {
      fullName: rawRepo.full_name
    };
  }



}
