const request = require('request');
const env = require('dotenv').config();

if (env.error) {
  throw env.error;
}

const gitHubKey = process.env.GITHUB_KEY;
const owner = process.argv[2];
const repo = process.argv[3];

const logItOut = item => new Promise((resolve, reject) => {
  try {
    console.log(item);
    resolve(item);
  } catch (e) {
    if (e) {
      reject(e);
    }
  }
});

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

const parseJSON = body => JSON.parse(body);

const mapUsers = parseddata => parseddata.map(user => user.login);

const structureStarObject = item => ({
  name: [item[0].name],
  stars: item[0].stargazers_count,
  repoOwner: item[0].owner.login,
});

const getUserOptionArray = (userArray) => {
  const userOptionsArr = userArray.map((user) => {
    return {
      url: `https://api.github.com/users/${user}/starred`,
      headers: {
        'User-Agent': 'node application',
        Authorization: `token ${gitHubKey}`,
      },
    };
  });
  return userOptionsArr;
};

const getPromiseArray = optionsArr => optionsArr.map(options => makeCall(options).then(parseJSON).then(structureStarObject));

const createRepoArray = promiseArr => Promise.all(promiseArr);

const sortRepos = repoArr => repoArr.sort((a, b) => b.stars - a.stars);

const getTopStars = sortedRepo => sortedRepo.slice(0, 5);

const outputToUser = (topStars) => {
  topStars.forEach((top) => {
    const {
      name,
      stars,
      repoOwner,
    } = top;
    console.log(`[ ${stars} stars ] ${repoOwner} / ${name}`);
  });
};
/**
 * ========IMPLEMENTATION ========
 */

try {
  if (owner && repo && (process.argv.length === 4)) {
    console.log('Welcome to the GitHub Repo Recommender!');
    recommendRepos(owner, repo)
      .then(makeCall)
      .then(parseJSON)
      .then(mapUsers)
      .then(getUserOptionArray)
      .then(getPromiseArray)
      .then(createRepoArray)
      .then(sortRepos)
      .then(getTopStars)
      .then(outputToUser)
      .catch((e) => {
        console.error(e);
      });
  } else {
    throw new Error('Missing required arguments: node recommend.js <owner> <repo>');
  }
} catch (err) {
  console.error(err);
}
