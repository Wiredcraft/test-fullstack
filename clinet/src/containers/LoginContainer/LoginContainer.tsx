import React from "react";
import {Link, useHistory} from "react-router-dom";

import {storeToken} from "../../api/client";
import NamePasswordForm from "../../components/NamePasswordFrom";
import {useLoginMutation} from "../../queries/hooks";

const LoginContainer: React.FunctionComponent = (): JSX.Element => {
    const history = useHistory();
    const [register] = useLoginMutation({
        onCompleted: async (data) => {
            await storeToken(data.login.token);
            history.push("/talks");
        }
    });

    const handleSubmit = async (name: string, password: string) => {
        await register({variables: {input: {name, password}}});
    };

    return (
        <NamePasswordForm
            title={"Login"}
            action={"login"}
            onSubmit={handleSubmit}
            alternative={<Link to="/register">don&#39;t have account?</Link>}
        />
    );
};

export default LoginContainer;
