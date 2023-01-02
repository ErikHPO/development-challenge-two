// use aws-sdk
const AWS = require("aws-sdk");
// remove to dynamodb
const dynamo = new AWS.DynamoDB.DocumentClient();
// export handler
exports.handler = async (event, context) => {
  let message = "User removed successfully";
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  // try to remove user
  try {
    await dynamo
      .delete({
        TableName: "medcloud-users",
        Key: event.pathParameters
      })
      .promise();
    
    // if there is an error
  } catch (err) {
    // set status code to 400
    statusCode = 400;
    message = "Não foi possível executar a ação";
  }
  finally{
    JSON.stringify(message)
  }
  // return response
  return {
    statusCode,
    "body": message,
    headers
  };
}