import React, { useEffect } from "react";
import Portal from "./portal";
import "./modal.css";

function freezeScreen() {
  document.body.classList.add("modal-body");
}

function unfreezeScreen() {
  document.body.classList.remove("modal-body");
}

export default ({ title, onClose, children }) => {
  useEffect(() => {
    freezeScreen();
    return () => unfreezeScreen();
  }, []);

  return (
    <Portal>
      <div className="modal-backdrop" />
      <div className="modal">
        <div className="modal-main">
          <div className="modal-content">
            {title && <div className="modal-title">{title}</div>}
            {children}
          </div>
          <div className="modal-footer">
            <button className="modal-button" onClick={onClose}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
