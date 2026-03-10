# 🧑‍🍳 Emoji Kitchen

This repository contains the source code for the website [https://emojikitchen.dev](https://emojikitchen.dev).

This website allows for quick and easy browsing of the comprehensive list of supported emoji mashups as part of Google's [Emoji Kitchen](https://emojipedia.org/emoji-kitchen/).

There are currently over 100,000 possible valid combinations showcasing the unique illustrations and combined emoji!

## Getting Started

This repository leverages [VSCode's devcontainer](https://code.visualstudio.com/docs/remote/containers) feature to ensure all necessary dependencies are available inside the container for development.

### Application

To get started, download the supporting metadata into `public/` (so the app can load it at runtime), then install and start the project:

```bash
curl -L --compressed https://raw.githubusercontent.com/xsalazar/emoji-kitchen-backend/main/app/metadata.json -o public/metadata.json
npm install && npm start
```

The metadata is loaded asynchronously after the app, which keeps the initial JavaScript bundle small and improves startup time.

This will start the application on your local machine, running on [http://localhost:5173/](http://localhost:5173).

### Deployments

All application deployments are managed via GitHub Actions and the [`./.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) workflow.

Additionally, application dependencies are automatically managed and updated via Dependabot and the [`./.github/workflows/automerge-dependabot.yml`](./.github/workflows/automerge-dependabot.yml) workflow.
