// use aws-sdk
const AWS = require("aws-sdk");
// update to dynamodb
const dynamo = new AWS.DynamoDB.DocumentClient();
// export handler
exports.handler = async (event, context) => {
  let body;
  let dataToUpdate = JSON.parse(event.body);
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  // try to update user
  try {
    body = await dynamo
      .update({
        TableName: "medcloud-users",
        Key: {
          id: event.pathParameters.id
        },
        UpdateExpression: "set #name = :name, birthdate = :birthdate, email = :email, address = :address, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#name": "name"
        },
        ExpressionAttributeValues: {
          ":name": dataToUpdate.name,
          ":birthdate": dataToUpdate.birthdate,
          ":email": dataToUpdate.email,
          ":address": dataToUpdate.address,
          ":updatedAt": Date.now()
        },
        ConditionExpression: "attribute_exists(id)"
       
      })
      .promise();
    body = `O paciente ${event.pathParameters.id} foi atualizado com sucesso.` ;
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
//
