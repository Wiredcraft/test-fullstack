import React from 'react';

const button = (props) => (
    <button
        className={props.cssClass}
        disabled={props.disabled || false}
        onClick={props.clicked}
    >
        {props.text}
    </button>
);

export default button;