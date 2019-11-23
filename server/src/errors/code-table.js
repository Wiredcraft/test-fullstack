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
  }
};
