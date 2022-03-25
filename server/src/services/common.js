"use strict";

const responseData = (data, statusCode = 200, errorCode, errorMessage) => {
  return {
    code: statusCode,
    data,
    errorCode,
    errorMessage,
  };
};

exports.CommonService = { responseData };
