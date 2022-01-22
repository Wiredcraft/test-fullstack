import React, { useState, useEffect } from 'react';

export default function(props) {
    const [ results, setResults ] = useState(props.defaults);

    useEffect(() => {
        props.dataSource(props.params)
            .then(body => {
                setResults(body);
            })
    }, [ JSON.stringify(props.params)] );

    return props.callback(results);
}