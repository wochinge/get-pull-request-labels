const core = require('@actions/core');
const github = require('@actions/github');


async function get_labels_for_branch() {
    const token = core.getInput('github-token', {required: true})
    const octokit = new github.GitHub(token);

    let branch = core.getInput('branch', {required: true})
    branch = branch.replace("refs/heads/", "");
    
    const { data: pull_requests } = await octokit.pulls.list({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
    })
    
    current_pr = pull_requests.find(pr => pr.head.ref === branch)
    
    let labels = []
    if (current_pr != null) {
        labels = current_pr.labels.map(label => label.name)
    }

    core.setOutput('labels', JSON.stringify(labels))
}

get_labels_for_branch().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});
