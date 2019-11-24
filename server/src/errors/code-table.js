module.exports.CODE = {
  // Usually for 200, just returns without any error message
  1000: {
    status: 200,
    message: 'Successful'
  },
  1001: {
    status: 500,
    message: 'Error'
  },

  // Business logic error code table
  1100: {
    status: 400,
    message: 'Data failed validation'
  },
  1101: {
    status: 401,
    message: 'Login required'
  },
  1102: {
    status: 400,
    message: 'Authorization: token xxx header is required'
  },

  1200: {
    status: 404,
    message: 'Talk not found'
  },

  1300: {
    status: 400,
    message: 'Listing order by field not valid'
  }
};
