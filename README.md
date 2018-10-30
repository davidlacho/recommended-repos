# GitHub Recommended Repos

## Description

 Given a target repo, this app recommends 5 repos (based on the most starred repos by the contributors to the target repo).

## Installation
Clone this repository to your local disk:
```
git clone https://github.com/fiveache/recommended-repos.git
```
cd to directory:
```
cd recommended-repos
```
Install dependencies
```
npm install
```
Generate your [GitHub Personal Access Token](https://github.com/settings/tokens). Create a new `.env` file in the root of directory
```
touch .env
```

In `.env`, paste the following code, replacing `<GitHub Access Token>` with your [GitHub Personal Access Token](https://github.com/settings/tokens):
```
GITHUB_KEY=<GitHub Access Token>
```
## Usage

This program should be executed from the command line, in the following manner:

`node recommend.js <user> <repository>`

## Outcomes of Project
  * Break down larger problems into smaller steps
  * work incrementally towards your solution.
  * HTTP
  * APIs
  * JSON
  * Node File System (fs)
  * JavaScript and Node
  * ES6 Syntax
  * JSDoc
  * Documentation
