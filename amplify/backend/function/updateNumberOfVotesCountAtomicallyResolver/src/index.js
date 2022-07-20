/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk')

const userTable = process.env.LIGHTNING_TALK_POLL_TABLE
const documentClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  const { lightningTalkPollID, undulation } = event.arguments

  const params = {
    TableName: userTable,
    Key: {
      id: lightningTalkPollID,
    },
    UpdateExpression: 'set numberOfVotes = numberOfVotes + :value',
    ExpressionAttributeValues: {
      ':value': undulation,
    },
    ReturnValues: 'UPDATED_NEW',
  }

  const result = await documentClient.update(params).promise()

  return result.Attributes.numberOfComments
}
