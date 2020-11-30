import React from "react";
import {Link, useHistory} from "react-router-dom";

import {storeToken} from "../../api/client";
import NamePasswordForm from "../../components/NamePasswordForm";
import {useRegisterMutation} from "../../queries/hooks";

const RegisterContainer: React.FunctionComponent = (): JSX.Element => {
    const history = useHistory();
    const [register] = useRegisterMutation({
        onCompleted: async (data) => {
            await storeToken(data.register.token);
            history.push("/talks");
        }
    });
    const handleSubmit = async (name: string, password: string) => {
        await register({variables: {input: {name, password}}});
    };

    return (
        <NamePasswordForm
            title={"Create Account"}
            action="register"
            onSubmit={handleSubmit}
            alternative={<Link to="/login">login</Link>}
        />
    );
};

export default RegisterContainer;
