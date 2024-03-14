# Frontend Shop Demo

[![Build and Deploy to GitHub Pages](https://github.com/ofersadan85/front-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/ofersadan85/front-demo/actions/workflows/deploy.yml)

This is a simple shop demo (frontend only for now) that is part of the Course [Python + React: Full Stack Web Development](https://github.com/ofersadan85/python-fullstack). It is currently a work in progress, and will be updated as the course progresses.

## Demo

You can view the demo [here](https://ofersadan85.github.io/front-demo/).

## Installation

To run it locally, you need to have Node.js / NPM installed ([See here for instructions](https://github.com/ofersadan85/python-fullstack/blob/main/01-introduction/npm.md)). Then, you can clone the repository and run the following commands:

```bash
git clone https://github.com/ofersadan85/front-demo.git
cd front-demo
npm install
npm run dev
```

This should start a local server on [http://localhost:5173/front-demo/](http://localhost:5173/front-demo/) where you can see the demo and make changes to the code. The server will automatically reload when you make changes to the code.

**Note**: If this is not working for any reason, try clearing out the browser cache (or just this site's data from local storage) and restarting the server. This is because this project is a work in progress and the data types may change between versions.

## Backend

Currently, we're using the [Fake Store API](https://fakestoreapi.com/) to get the products. In the future, we will replace it with our own backend.
