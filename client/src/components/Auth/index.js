import React, { useState } from 'react';

const Context = React.createContext({});

function Provider(props) {
    const [user, setUser] = useState(app.storage.get('user'));

    function notifyUserChange(user) {
        setUser(app.storage.get('user'));
    }

    return (
        <Context.Provider value={{ user, notifyUserChange }} >
            {props.children}
        </Context.Provider>
    )
}

export default {
    Context: Context,
    Provider: Provider
}