# gitodoro

[![Join the chat at https://gitter.im/gitodoro/gitodoro](https://badges.gitter.im/gitodoro/gitodoro.svg)](https://gitter.im/gitodoro/gitodoro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
