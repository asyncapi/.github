## Github Workflow Security Tightening Progress

### Github workflows

- [ ] [zizmor.yml](zizmor.yml)
- [ ] [add-good-first-issue-labels.yml](.github/workflows/add-good-first-issue-labels.yml)
- [ ] [automerge-for-humans-add-ready-to-merge-or-do-not-merge-label.yml](.github/workflows/automerge-for-humans-add-ready-to-merge-or-do-not-merge-label.yml)
- [ ] [automerge-for-humans-merging.yml](.github/workflows/automerge-for-humans-merging.yml)
- [ ] [automerge-for-humans-remove-ready-to-merge-label-on-edit.yml](.github/workflows/automerge-for-humans-remove-ready-to-merge-label-on-edit.yml)
- [ ] [automerge-orphans.yml](.github/workflows/automerge-orphans.yml)
- [ ] [automerge.yml](.github/workflows/automerge.yml)
- [ ] [autoupdate.yml](.github/workflows/autoupdate.yml)
- [ ] [bounty-program-commands.yml](.github/workflows/bounty-program-commands.yml)
- [ ] [bump.yml](.github/workflows/bump.yml)
- [ ] [global-remover.yml](.github/workflows/global-remover.yml)
- [ ] [global-replicator.yml](.github/workflows/global-replicator.yml)
- [ ] [help-command.yml](.github/workflows/help-command.yml)
- [ ] [if-docker-pr-testing.yml](.github/workflows/if-docker-pr-testing.yml)
- [ ] [if-go-pr-testing.yml](.github/workflows/if-go-pr-testing.yml)
- [ ] [if-nodejs-pr-testing.yml](.github/workflows/if-nodejs-pr-testing.yml)
- [ ] [if-nodejs-release.yml](.github/workflows/if-nodejs-release.yml)
- [ ] [if-nodejs-version-bump.yml](.github/workflows/if-nodejs-version-bump.yml)
- [ ] [issues-prs-notifications.yml](.github/workflows/issues-prs-notifications.yml)
- [ ] [lint-pr-title.yml](.github/workflows/lint-pr-title.yml)
- [x] [notify-tsc-members-mention.yml](.github/workflows/notify-tsc-members-mention.yml) - pull_request_target not a big issue for this one. Mailchimp script needs to be tightened though.
- [x] [please-take-a-look-command.yml](.github/workflows/please-take-a-look-command.yml) - permissions added to the workflow. [Test PR](https://github.com/asyncapi-actions-test/asyncapi-github/pull/3#issuecomment-4031325220) and [Test Workflow Run](https://github.com/asyncapi-actions-test/asyncapi-github/actions/runs/22904380860/job/66458939263)
- [x] [release-announcements.yml](.github/workflows/release-announcements.yml) Just added content read permissions and removed checkout persist credentials.
- [x] [stale-issues-prs.yml](.github/workflows/stale-issues-prs.yml) - Permissions added to the workflow and the job. [Test Issue](https://github.com/asyncapi-actions-test/asyncapi-github/issues/2#issuecomment-4029175489) and [Test Workflow Run](https://github.com/asyncapi-actions-test/asyncapi-github/actions/runs/22891096690)
- [x] [transfer-issue.yml](.github/workflows/transfer-issue.yml) Removed that as it was not working right now.
- [x] [update-docs-on-docs-commits.yml](.github/workflows/update-docs-on-docs-commits.yml) - Just added content read permissions since the workflow uses GH_TOKEN and removed checkout persist credentials.
- [x] [update-maintainers-trigger.yaml](.github/workflows/update-maintainers-trigger.yaml) Didn't do too much, just added content read permissions since the workflow uses GH_TOKEN.
- [x] [update-pr.yml](.github/workflows/update-pr.yml) - [Test PR](https://github.com/asyncapi-actions-test/asyncapi-github/pull/5)
- [ ] [validate-workflow-schema.yml](.github/workflows/validate-workflow-schema.yml)
- [x] [welcome-first-time-contrib.yml](.github/workflows/welcome-first-time-contrib.yml) - permissions tightened and GH_TOKEN -> GITHUB_TOKEN so that pull_request_target is no longer required. [Test Issue](https://github.com/asyncapi-actions-test/asyncapi-github/issues/2)

### Scripts

- [ ] [Mailchimp scripts](.github/workflows/scripts/mailchimp/)
  - htmlContent.js
  - index.js
  - package.json
  - package-lock.json

### Actions

- [ ] [get-node-version-from-package-lock](.github/actions/get-node-version-from-package-lock/)
  - action.yml
  - README.md
- [ ] [slackify-markdown](.github/actions/slackify-markdown/)
  - action.yml


## Add actions-permission monitoring to the issues.
