const request = require('request');
const env = require('dotenv').config();

if (env.error) {
  throw env.error;
}

const gitHubKey = process.env.GITHUB_KEY;
const owner = process.argv[2];
const repo = process.argv[3];

const recommendRepos = (repoOwner, repoName) => new Promise((resolve) => {
  resolve({
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'node application',
      Authorization: `token ${gitHubKey}`,
    },
  });
});

const makeCall = options => new Promise((resolve, reject) => request(options, (err, res, body) => {
  if (err) {
    reject(err);
  } else {
    resolve(body);
  }
}));

const parseJSON = body => new Promise((resolve, reject) => {
  let parsedData;
  try {
    parsedData = JSON.parse(body);
  } catch (e) {
    reject(e);
  }
  resolve(parsedData);
});

const mapUsers = parseddata => new Promise((resolve, reject) => {
  try {
    resolve(parseddata.map(user => user.login));
  } catch (e) {
    if (e) {
      reject(e);
    }
  }
});

// const getStarred = userArray => new Promise((resolve) => {
//   userArray.forEach((user, i) => {
//     const options = {
//       url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
//       headers: {
//         'User-Agent': 'node application',
//         Authorization: `token ${gitHubKey}`,
//       },
//     };
//     makeCall(options)
//     .then()
//   });
//
//
// });

const logItOut = item => new Promise((resolve, reject) => {
  try {
    console.log(item);
  } catch (e) {
    if (e) {
      reject(e);
    }
  }
});

try {
  if (owner && repo && (process.argv.length === 4)) {
    console.log('Welcome to the GitHub Repo Recommender!');
    recommendRepos(owner, repo)
      .then(makeCall)
      .then(parseJSON)
      .then(mapUsers)
      .then(logItOut)
      // .then(getStarred)
      .catch((e) => {
        console.error(e);
      });
  } else {
    throw new Error('Missing required arguments: node recommend.js <owner> <repo>');
  }
} catch (err) {
  console.error(err);
}
