<h1 align="center">
  <br>
  <a href="https://www.asyncapi.com"><img src="./assets/github-repobanner-ghcommunityhealth.png" alt="AsyncAPI logo"></a>
</h1>

The purpose of this repository is to keep all the community health files that we would normally have to duplicate in each repository. These are global community files that apply to repositories that do not have their own files.

Below is a list of workflows with their corresponding topics and descriptions:

| Topic to include | Workflows you will get | Description |
| --- | --- | --- |
| `get-workflows-validation` | [validate-workflow-schema](.github/workflows/validate-workflow-schema.yml) | Validates the YAML schema of a workflow files in your repository 
| `golang` | [if-go-pr-testing](https://github.com/asyncapi/.github/blob/master/.github/workflows/if-go-pr-testing.yml) | Compiles and tests Go code using multiple versions of Go
| `nodejs` | [if-nodejs-pr-testing](https://github.com/asyncapi/.github/blob/master/.github/workflows/if-nodejs-pr-testing.yml) | Builds and tests Node.js projects using multiple Node.js versions
| `get-global-node-release-workflows` | [if-nodejs-release](https://github.com/asyncapi/.github/blob/master/.github/workflows/if-nodejs-release.yml), [if-nodejs-version-bump.yml](https://github.com/asyncapi/.github/blob/master/.github/workflows/if-nodejs-version-bump.yml) , [bump.yml](https://github.com/asyncapi/.github/blob/master/.github/workflows/bump.yml) | Fetches and publishes Node.js release information to the project's website
| `get-global-releaserc` | [.releaserc](https://github.com/asyncapi/.github/blob/master/.github/workflows/.releaserc) | Fetches release configuration files from a remote repository and makes them available to other workflows 