import React from 'react';

const button = (props) => (
    <button
        className={props.cssClass}
        onClick={props.clicked}
    >
        {props.text}
    </button>
);

export default button;