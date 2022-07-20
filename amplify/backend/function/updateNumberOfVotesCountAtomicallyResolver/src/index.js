/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["apikey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_LIGHTNINGTALKGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_LIGHTNINGTALKGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	API_LIGHTNINGTALKGRAPHQLAPI_GRAPHQLAPIKEYOUTPUT
	AUTH_LTPAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk')

const userTable = process.env.LIGHTNING_TALK_POLL_TABLE
const documentClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  const { id } = event.arguments

  const params = {
    TableName: userTable,
    Key: {
      id,
    },
    UpdateExpression: 'set numberOfVotes = numberOfVotes + :value',
    ExpressionAttributeValues: {
      ':value': 1,
    },
    ReturnValues: 'UPDATED_NEW',
  }

  const result = await documentClient.update(params).promise()

  return result.Attributes.numberOfComments
}
