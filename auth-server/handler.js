'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {
  
  console.log(event.pathParameters,'test')
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=jr2bsub23bropmv7e9cn3v9mvp'
    + '&client_secret=j0jrlqsm7357f31q6n4a9lt2sd'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://cilvin.github.io/meetup/'
    + '&code=' + event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};

module.exports.refreshAccessToken = async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=jr2bsub23bropmv7e9cn3v9mvp'
    + '&client_secret=j0jrlqsm7357f31q6n4a9lt2sd'
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};