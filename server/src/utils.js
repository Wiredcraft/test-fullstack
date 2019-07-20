const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

//APP_SECRET to sign the JWTs

//Helper function to be called in resolvers,
//Wich require authentication.
function getUserId(context) {
  //get the Authorization header, contains user JWT from context
  const Authorization = context.request.get('Authorization');
  //Verify the JWT
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  //if not verified throw error
  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
};
