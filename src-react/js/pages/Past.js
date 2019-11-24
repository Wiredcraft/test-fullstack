import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import Content from '@components/Content'

const Past = ({posts}) => {
    useEffect(() => {
        posts.filterDataByPast();
    }, []);
    return (
        <Content />
    )
}


const mapDispatchToProps = ({ posts }) => ({
    posts,
});

export default connect(
    null,
    mapDispatchToProps
)(Past)