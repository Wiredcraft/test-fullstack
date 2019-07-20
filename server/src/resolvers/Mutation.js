const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  // Encrypt users password using bcrypt
  const password = await bcrypt.hash(args.password, 10);
  // store new user in the database
  const user = await context.prisma.createUser({ ...args, password });

  // generate JWT, sign with APP_SECRET
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // return tork and the user
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  // Retrieve existing user. if not found throw error.
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }

  // compare entered password with database
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // return token and user
  return {
    token,
    user
  };
}

//Using getUserId to get the ID of the user.
//Connecting the Link to be created with the User
function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

module.exports = {
  signup,
  login,
  post
};
