import React from 'react';
import fecha from 'fecha';

export default function(props) {
    const now = new Date();
    const date = new Date(props.date);

    props = {
        ...props,
        title: fecha.format(date, 'YYYY-MM-DD HH:mm')
    }

    if (now - date.getTime() < 60*60*1000) {
        return (
            <time {...props}>{Math.ceil((now - date.getTime())/(60*1000))} minutes before</time>
        )
    }

    if (now - date.getTime() < 24*60*60*1000) {
        return (
            <time {...props}>{Math.ceil((now - date.getTime())/(60*60*1000))} hours before</time>
        )
    }

    if (now - date.getTime() < 30*24*60*60*1000) {
        return (
            <time {...props}>{Math.ceil((now - date.getTime())/(24*60*60*1000))} days before</time>
        )
    }

    if (now - date.getTime() < 12*30*24*60*60*1000) {
        return (
            <time {...props}>{Math.ceil((now - date.getTime())/(30*24*60*60*1000))} month before</time>
        )
    }

    return (
        <time {...props}>{fecha.format(date, 'YYYY-MM-DD HH:mm')}</time>
    )
}