import React, { PropTypes } from 'react';

const Error = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className="error">
        {message}
      </div>
    );
  }
  return null;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;