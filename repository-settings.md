All repositories in `asyncapi` organizations should be similar in structure, settings, and restrictions. Follow these guidelines to adjust settings of a new repository created in one of these organizations.

## Adjust repository options

Under the repository name, choose the **Settings** tab. The **Options** view opens as the default one in the left menu.

1. Scroll down to the **Features** section and clear these options:
    - Wikis
    - Projects

Make sure **Sponsorships** option is selected and `open_collective: asyncapi` is provided.

2. Go to the **Merge button** section and clear these options:
    - Allow merge commits
    - Allow rebase merging

Leave only the **Allow squash merging** option selected. This option combines all commits into one before merging the changes into the `master` branch.

3. Make sure option **Automatically delete head branches** is selected

* Each repository must be integrated with https://sonarcloud.io/organizations/asyncapi/projects for automated quality and security scans.

## Add basic GitHub Actions configurations

Create `.github/workflows` directory and the following configurations:

* Handling of stale issues and PRs should be stored in `stale-issues-prs.yml` file with the following content:
    ```
    name: Manage stale issues and PRs

    on:
      schedule:
      - cron: "0 0 * * *"

    jobs:
      stale:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/stale@v1.1.0
          with:
            repo-token: ${{ secrets.GITHUB_TOKEN }}
            stale-issue-message: |
              This issue has been automatically marked as stale because it has not had recent activity :sleeping:
              It will be closed in 30 days if no further activity occurs. To unstale this issue, add a comment with detailed explanation. 
              Thank you for your contributions :heart:
            stale-pr-message: |
              This pull request has been automatically marked as stale because it has not had recent activity :sleeping:
              It will be closed in 30 days if no further activity occurs. To unstale this pull request, add a comment with detailed explanation. 
              Thank you for your contributions :heart:
            days-before-stale: 60
            days-before-close: 30
            stale-issue-label: stale
            stale-pr-label: stale
            exempt-issue-label: keep-open
            exempt-pr-label: keep-open
    ```

* Welcome message for first-time contributors should be stored in `welcome-first-time-contrib.yml` file with the following content:
    ```
    name: Welcome first time contributors

    on:
      pull_request_target:
        types: 
        - opened
      issues:
        types:
        - opened

    jobs:
      welcome:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/first-interaction@v1.0.0
        with:
            repo-token: ${{ secrets.GITHUB_TOKEN }}
            issue-message: |
              Welcome to AsyncAPI. Thanks a lot for reporting your first issue.

              Keep in mind there are also other channels you can use to interact with AsyncAPI community. For more details check out [this issue](https://github.com/asyncapi/asyncapi/issues/115).
            pr-message: |
              Welcome to AsyncAPI. Thanks a lot for creating your first pull request.

              Keep in mind there are also other channels you can use to interact with AsyncAPI community. For more details check out [this issue](https://github.com/asyncapi/asyncapi/issues/115).
    ```

* Automerge workflow that should be based on the following content:
    ```
    name: Automerge release bump PR

    on:
      pull_request:
        types:
          - labeled
          - unlabeled
          - synchronize
          - opened
          - edited
          - ready_for_review
          - reopened
          - unlocked
      pull_request_review:
        types:
          - submitted
      check_suite: 
        types:
          - completed
      status: {}
      
    jobs:

      autoapprove:
        runs-on: ubuntu-latest
        steps:
          - name: Autoapproving
            uses: hmarr/auto-approve-action@v2.0.0
            if: github.actor == 'asyncapi-bot' || github.actor == 'dependabot[bot]' || github.actor == 'dependabot-preview[bot]'
            with:
              github-token: "${{ secrets.GITHUB_TOKEN }}"

      automerge:
        needs: [autoapprove]
        runs-on: ubuntu-latest
        steps:
          - name: Automerging
            uses: pascalgn/automerge-action@v0.7.5
            if: github.actor == 'asyncapi-bot' || github.actor == 'dependabot[bot]' || github.actor == 'dependabot-preview[bot]'
            env:
              GITHUB_TOKEN: "${{ secrets.GH_TOKEN }}"
              GITHUB_LOGIN: asyncapi-bot
              MERGE_LABELS: ""
              MERGE_METHOD: "squash"
              MERGE_COMMIT_MESSAGE: "pull-request-title"
              MERGE_RETRIES: "10"
              MERGE_RETRY_SLEEP: "10000"
    ```

* Release workflow that should be based on the following content:
    ```
    name: Release

    on:
      push:
        branches:
          - master

    jobs:
      release:
        name: 'Release NPM, GitHub'
        runs-on: ubuntu-latest
        steps:
          - name: Checkout repo
            uses: actions/checkout@v2
          - name: Setup Node.js
            uses: actions/setup-node@v1
            with:
              node-version: 13
          - name: Install dependencies
            run: npm ci
          - name: Run tests
            run: npm test
          - name: Get version from package.json before release step
            id: initversion
            run: echo "::set-output name=version::$(npm run get-version --silent)"
          - name: Release to NPM and GitHub
            id: release
            env:
              GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
              NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
              GIT_AUTHOR_NAME: asyncapi-bot
              GIT_AUTHOR_EMAIL: info@asyncapi.io
              GIT_COMMITTER_NAME: asyncapi-bot
              GIT_COMMITTER_EMAIL: info@asyncapi.io
            run: npm run release
          - name: Get version from package.json after release step
            id: extractver
            run: echo "::set-output name=version::$(npm run get-version --silent)"
          - name: Create Pull Request with updated package files
            if: steps.initversion.outputs.version != steps.extractver.outputs.version
            uses: peter-evans/create-pull-request@v2.4.4
            with:
              token: ${{ secrets.GH_TOKEN }}
              commit-message: 'chore(release): ${{ steps.extractver.outputs.version }}'
              committer: asyncapi-bot <info@asyncapi.io>
              author: asyncapi-bot <info@asyncapi.io>
              title: 'chore(release): ${{ steps.extractver.outputs.version }}'
              body: 'Version bump in package.json and package-lock.json for release [${{ steps.extractver.outputs.version }}](https://github.com/${{github.repository}}/releases/tag/v${{ steps.extractver.outputs.version }})'
              branch: version-bump/${{ steps.extractver.outputs.version }}
          - name: Check if version changed  # Version check based on package.json version number
            uses: EndBug/version-check@v1.6.0
            id: check
          - name: Publish information about the release to Twitter # tweet only if detected version change is not a patch
            if: steps.check.outputs.changed == 'true' && steps.check.outputs.type != 'patch'
            uses: m1ner79/Github-Twittction@v1.0.1
            with:
              twitter_status: "Release ${{ steps.check.outputs.version }} for ${{github.repository}} is out in the wild 😱💪🍾🎂\n\nThank you for the contribution ${{ github.event.commits[0].author.name }} https://github.com/${{github.repository}}/releases/tag/v${{ steps.check.outputs.version }}"
              twitter_consumer_key: ${{ secrets.TWITTER_CONSUMER_KEY }} 
              twitter_consumer_secret: ${{ secrets.TWITTER_CONSUMER_SECRET }} 
              twitter_access_token_key: ${{ secrets.TWITTER_ACCESS_TOKEN_KEY }} 
              twitter_access_token_secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
    ```



* Sentiment analysis workflow should be stored in `sentiment-analysis.yml` with the following content:
    ```
    name: 'Sentiment Analysis'

    on: 
    issue_comment:
        types: 
        - created
        - edited
    issues:
        types:
        - opened
        - edited
    pull_request:
        types:
        - opened
        - edited
    pull_request_review:
        types:
        - submitted
        - edited
    pull_request_review_comment:
        types:
        - created
        - edited
    jobs:
    test:
        name: Checking sentiments
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - name: Check sentiment
            uses: derberg/code-of-conduct-sentiment-analysis-github-action@v1
            id: sentiments
            with:
            gcp_key: ${{ secrets.GCP_KEY_SENTIMENT }} 
        - uses: someimportantcompany/github-actions-slack-message@v1
            # this step runs only if sentiment is a negative numner
            if: steps.sentiments.outputs.sentiment < 0
            with:
            webhook-url: ${{ secrets.SLACK_SENTIMENTS }}
            text: Here ${{steps.sentiments.outputs.source}} you can find a potential negative text that requires your attention as the sentiment analysis score is ${{steps.sentiments.outputs.sentiment}}
            color: orange
    ```
