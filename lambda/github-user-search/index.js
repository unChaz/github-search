const https = require('https');
const querystring = require('querystring');

function getRequest(query) {
  let queryString = querystring.stringify(query)
  const options = {
    hostname: 'api.github.com',
    path: `/search/users?${queryString}`,
    method: 'GET',
    port: 443,
    headers: {
      'Authorization': "token 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",
      'Accept': "application/vnd.github+json",
      'User-Agent': "unChaz"
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });

    req.end();
  });
}

exports.handler = async event => {
  try {
    const result = await getRequest(event.queryStringParameters);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
