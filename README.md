[![Join the chat at https://gitter.im/gitodoro/gitodoro](https://img.shields.io/badge/chat-on_gitter-1dce73.svg?style=flat-square)](https://gitter.im/gitodoro/gitodoro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/gitodoro/gitodoro/blob/master/ROADMAP.md)
[![Dependencies](https://david-dm.org/gitodoro/gitodoro.svg?style=flat-square)](https://david-dm.org/gitodoro/gitodoro)
[![Dev Dependencies](https://david-dm.org/gitodoro/gitodoro/dev-status.svg?style=flat-square)](https://david-dm.org/gitodoro/gitodoro?type=dev)
[![Travis](https://img.shields.io/travis/gitodoro/gitodoro.svg?style=flat-square)](https://travis-ci.org/gitodoro/gitodoro)
[![Coverage Status](https://img.shields.io/coveralls/gitodoro/gitodoro.svg?style=flat-square)](https://coveralls.io/github/gitodoro/gitodoro?branch=master)

# gitodoro

## What?

A pomodoro timer that links to your github account.

## Why?

Helping you being a more *efficient* you.

## How?

Track your work in segments of 25 minutes against a particular github issue.

## Getting Started

- `git clone` this repo
- `cd` into the folder
- Install the dependencies: run `npm install` (or `yarn` if you're using yarn)
- Create environment variables:  you'll need to create a config.env file with:
  - GITHUB_CLIENT_ID
  - GITHUB_CLIENT_SECRET
  - BASE_URL

- Build the files: run `npm run dist`
- Start the server: run `npm start`
- server should be running on http://localhost:3000

## Contributions

We welcome your contributions with open arms, please see the [Roadmap](https://github.com/gitodoro/gitodoro/blob/master/ROADMAP.md) to see where you can contribute. We also ask that you open an issue before starting on a PR to check that its not already being worked on.

Thanks!
