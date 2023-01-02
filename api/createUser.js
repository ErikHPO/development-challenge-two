// use aws-sdk
const AWS = require("aws-sdk");
// post to dynamodb
const dynamo = new AWS.DynamoDB.DocumentClient();
// export handler
exports.handler = async (event, context) => {
  let message;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  // try to post user
  try {
    
    let {name, birthdate, email, address} = event;
    const newUser = {
      id: 'u' + Math.round((Math.random() *1000) + 1000),
      name: name,
      birthdate: birthdate,
      email: email,
      address: address,
      createdAt: Date.now()
    }
    // if id or e-mail already exists
    const user = await dynamo
      .get({
        TableName: "medcloud-users",
        Key: {
          id: newUser.id
        }
      })
      .promise();
    if (user.Item) {
      throw new Error("User already exists");
    }
    // post user
    await dynamo
      .put({
        TableName: "medcloud-users",
        Item: newUser
      })
      .promise();
    message = "User created successfully";
    // if there is an error
  } catch (err) {
    // set status code to 400
    statusCode = 400;
    // set body to error message
    message = err.message;
    // finally
  }
  // return response
  return {
    statusCode,
    message,
    headers
  };
};