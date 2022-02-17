import React from 'react';
import './index.scss';

type Props = {
  visable: boolean;
  title?: string;
};

const Modal: React.FC<Props> = (props) => {
  if (!props.visable) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">{props.title}</div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
