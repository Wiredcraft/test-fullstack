import React, {useState} from "react";

import "./NamePasswordForm.css";

type Props = {
    title: string;
    action: string;
    onSubmit: (name: string, password: string) => void;
    alternative?: JSX.Element;
};

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const useFormInput = (initialState: string): [string, (event: ChangeEvent) => void] => {
    const [value, setValue] = useState<string>(initialState);

    const onChange = (e: ChangeEvent) => {
        setValue(e.target.value);
    };

    return [value, onChange];
};

const NamePasswordForm: React.FunctionComponent<Props> = ({
    title,
    action,
    alternative,
    onSubmit
}): JSX.Element => {
    const [name, handleNameChange] = useFormInput("");
    const [password, handlePasswordChange] = useFormInput("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && password) {
            onSubmit(name, password);
        }
    };

    return (
        <form className="form" name="form" onSubmit={handleSubmit}>
            <h1 className="title">{title}</h1>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="form-group">
                {alternative}
                <button type="submit" className="button">
                    {action}
                </button>
            </div>
        </form>
    );
};

export default NamePasswordForm;
