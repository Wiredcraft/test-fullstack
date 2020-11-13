import React from "react";

const HelloWorld: React.FunctionComponent = (): JSX.Element => (
    <>
        <h1>Hello World</h1>
        <hr />
        <h3>Environmental variables:</h3>
        <p>
            process.env.NAME: <b>{process.env.NAME}</b>
        </p>
        <p>
            process.env.VERSION: <b>{process.env.VERSION}</b>
        </p>
    </>
);

export default HelloWorld;
