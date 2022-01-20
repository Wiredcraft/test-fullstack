import React, { useState, useEffect } from 'react';

const Context = React.createContext({});

function Provider(props) {
    const [ values, setValues ] = useState(props.values || {});
    const [ errors, setErrors ] = useState(props.errors || {});

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            ...props.values
        }))
    }, [ JSON.stringify(props.values)]);

    useEffect(() => {
        setErrors(props.errors);
    }, [ JSON.stringify(props.errors)]);

    function onValuesChange(changedValues) {
        setValues(prevValues => ({
            ...prevValues,
            ...changedValues
        }))
        if (props.onValuesChange) {
            props.onValuesChange(changedValues);
        }
    }

    return (
        <Context.Provider values={values} onValuesChange={onValuesChange}>
            {props.children}
        </Context.Provider>
    )
}

export default {
    Context: Context,
    Provider: Provider
}