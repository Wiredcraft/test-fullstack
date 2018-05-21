import React from 'react';

const button = (props) => (
    <div className="text-center mt-4">
        <button
            className={props.cssClass}
            onClick={props.clicked}
        >
            {props.text}
        </button>
    </div>
);

export default button;