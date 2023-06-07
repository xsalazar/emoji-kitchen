# 🧑‍🍳 Emoji Kitchen

This repository contains the source code for the website [https://emojikitchen.dev](https://emojikitchen.dev) and was bootstrapped using [`create-react-app`](https://github.com/facebook/create-react-app).

This website allows for quick and easy browsing of the comprehensive list of supported emoji mashups as part of Google's [Emoji Kitchen](https://emojipedia.org/emoji-kitchen/).

There are currently just over 30,000 possible valid combinations showcasing the unique illustrations and combined emoji!

## Getting Started

This repository leverages [VSCode's devcontainer](https://code.visualstudio.com/docs/remote/containers) feature to ensure all necessary dependencies are available inside the container for development.

### Application

To get started:

```bash
npm init && npm start
```

This will start the application on your local machine, running on [http://localhost:3000/](http://localhost:3000).

### Deployments

All application deployments are managed via GitHub Actions and the [`./.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) workflow.

Additionally, application dependencies are automatically managed and updated via Dependabot and the [`./.github/workflows/automerge-dependabot.yml`](./.github/workflows/automerge-dependabot.yml) workflow.

## Supporting Emoji Data

This list of supported emoji and valid emoji combinations was built by scraping Google's API that serves the mashed up images.

This tooling can be found in the [`./scripts`](./scripts) directory.

The [output JSON file](./scripts/emojiOutput.json) is committed directly to this repository due to the extended nature of how long it takes to gather this information.

The script allows for iteratively building on this saved data, so future emojis need only be added to the scraping algorithm and it will be partially added into the existing file.
