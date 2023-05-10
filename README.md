# PIPS blog.yactouat.com

<!-- TOC -->

- [PIPS blog.yactouat.com](#pips-blogyactouatcom)
  - [What is this ?](#what-is-this-)
  - [How to use it ?](#how-to-use-it-)
    - [routes and endpoints](#routes-and-endpoints)
      - [API](#api)
      - [web app'](#web-app)
  - [How to deploy it ?](#how-to-deploy-it-)
  - [Code Viz](#code-viz)
  - [Contribution guidelines](#contribution-guidelines)
  - [Contributors](#contributors)

<!-- /TOC -->

## What is this ?

This is the frontend of my blog and personal website, powered by NextJS and Typescript. This project is part of my PIPS (Portable Integrated Personal System) feel free to use this as a template for your own blog.

It works by triggering its own builds when it receives a message from the PIPS system, that tells it that a new post has been published; it then fetches the latest posts from the API and builds the site in SSG mode.

As a matter of fact, the `/api/builds` endpoint is a webhook that triggers a build on Vercel when receiving a Google PubSub message; for this to work, you need to have:

- a Google Pub Sub push subscription sent to your live `api/builds` endpoint
- a `PUBSUB_TOKEN_AUDIENCE` environment variable set on your Vercel deployment to the audience of the token you'll receive from Google PubSub
- a `PUBSUB_TOKEN_EMAIL` environment variable set to the email of the Google service account that is sending the push subscription message
- a `VERCEL_PROJECT` and a `VERCEL_TOKEN` environment variable are set to be able to talk the Vercel API

## How to use it ?

Go to blog.yactouat.com or clone the repo and run `npm install && npm run dev` to start the server on port 3000. If you're running this locally, you'll need:

- [Node.js](https://nodejs.org/en/) >= 10.13
- [Typescript](https://www.typescriptlang.org/)
- this frontend app' is meant to be used with <https://github.com/yactouat/pips_channel_personal-website_api> running on port 8080 by default on localhost
- a couple of env vars, listed in `.env.example`
- the [API that this thing is designed to run with](https://github.com/yactouat/pips_channel_personal-website_api)

Then, to personnalize it for your own needs, you may have a look at `./STATIC_APP_DATA.ts` to change the app' name, description, etc.

For now, filling the app's data is static, but I intend to make it a full e2e solution to build web apps and their ecosystems in the near future.

### routes and endpoints

#### API

- GET `/api/builds` : get the latest builds of the app'
- POST `/api/builds` : PubSub webhook to trigger a build on Vercel
- GET `/api/statuses` : returns the current status of the app'

#### web app'

- `/` : the home page, with the blog posts list
- `/login`
- `/logout`
- `/password-reset`: allows to send a request to reset your password, sent to your inbox
- `/posts/:slug` : the given post by slug or 404
- `/profile` : your user profile page
- `/signup`

## How to deploy it ?

We recommend using Vercel for deployments.

App' is deployed on Vercel, creating a PR should allow for previewing; watch out for the root directory of the app' and the preset configuration of the Vercel app' when you set up the project.

## Code Viz

<https://mango-dune-07a8b7110.1.azurestaticapps.net/?repo=yactouat%2Fpips_blog.yactouat.com>

## Contribution guidelines

dear past, present, and future contributors, you have my many thanks, but please follow these guidelines:

- please use comments to explain your code, even if it's obvious to you, it might not be to someone else
- you are free to arrange the code, the folder structure, the file names, etc. as you see fit if you're able to provide a good reason for it

that's all, thank you for your time !

## Contributors

A big thanks goes to the contributors of this project:

<table>
<tbody>
    <tr>
        <td align="center"><a href="https://github.com/yactouat"><img src="https://avatars.githubusercontent.com/u/37403808?v=4" width="100px;" alt="yactouat"/><br /><sub><b>Yactouat</b></sub></a><br /><a href="https://github.com/yactouat"></td>
    </tr>
</tbody>
</table>
