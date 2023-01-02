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
    body = JSON.stringify(body);
  }
  // return response
  return {
    statusCode,
    body,
    headers
  };
};

// Path: api\getUser.js
// Compare this snippet from api\index.js:
// const AWS = require("aws-sdk");
// 
// const dynamo = new AWS.DynamoDB.DocumentClient();
// 
// exports.handler = async (event, context) => {
//   let body;
//   let statusCode = 200;
//   const headers = {
//     "Content-Type": "application/json"
//   };
// 
//   try {
//     switch (event.routeKey) {
//       case "DELETE /items/{id}":
//         await dynamo
//           .delete({
//             TableName: "medcloud-users",
//             Key: {
//               id: event.pathParameters.id
//             }
//           })
//           .promise();
//         body = `Deleted item ${event.pathParameters.id}`;
//         break;
//       case "GET /items/{id}":
//         body = await dynamo
//           .get({
//             TableName: "medcloud-users",
//             Key: {
//               id: event.pathParameters.id
//             }
//           })
//           .promise();
//         break;
//       case "GET /items":
//         body = await dynamo.scan({ TableName: "medcloud-users" }).promise();
//         break;
//       case "PUT /items":
//         let requestJSON = JSON.parse(event.body);
//         await dynamo
//           .put({
//             TableName: "medcloud-users",
//             Item: {
//               id: requestJSON.id,
//               price: requestJSON.price,
