// use aws-sdk
const AWS = require("aws-sdk");
// use dynamodb
const dynamo = new AWS.DynamoDB.DocumentClient();
// export handler
exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  // try to get all the users
  try {
    body = await dynamo.scan({ TableName: "medcloud-users" }).promise();
    // if there is an error
  } catch (err) {
    // set status code to 400
    statusCode = 400;
    // set body to error message
    body = err.message;
    // finally
  } finally {
    // stringify body
    body = body.Items;
  }
  // return response
  return {
    statusCode,
    body,
    headers
  };
};