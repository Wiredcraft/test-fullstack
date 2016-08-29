import React, { PropTypes } from 'react';

const Message = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className="message">
        {message}
      </div>
    );
  }
  return null;
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
