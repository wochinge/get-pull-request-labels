# Get Pull Request Labels

This action can be used in GitHub actions to retrieve labels for a pull request
on `push` events. In case your GitHub action is triggered by a `pull_request` event
you don't need this action and can retrieve the labels from the context of the 
`pull_request` event.

## Parameters

- `repo-token`: This token is used to authenticate with the GitHub API
- `branch`: Branch which is used to identify the pull request for whom the labels 
   should be retrieved

## Usage

```
name: 'Your workflow'
on:
- push

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
    - uses: wochinge/get-pull-request-labels
      id: pull_request_labels
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        branch: "${{ github.ref }}"

    - name: Do something if the label is provided
      if: contains(steps.pull_request_labels.outputs.labels, '"<your label>"')
      run: echo "hi"
```
