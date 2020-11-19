import React from "react";
import {Link} from "react-router-dom";

import "./Header.css";
import {User} from "../../queries/schemas";

type Props = {
    user?: Partial<User>;
};

const HelloWorld: React.FunctionComponent<Props> = ({user}): JSX.Element => (
    <div className="header">
        <h1>Hacker Talks</h1>
        {user?.name ? <span>{user.name}</span> : <Link to="login">login</Link>}
    </div>
);

export default HelloWorld;
