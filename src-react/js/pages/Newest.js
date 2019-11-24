import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import Content from '@components/Content'

const Newest = ({posts}) => {
    useEffect(() => {
        posts.filterDataByNewest();
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
)(Newest)