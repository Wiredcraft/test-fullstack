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
