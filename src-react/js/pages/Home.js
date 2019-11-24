import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import Content from '@components/Content'

const Home = ({posts}) => {
    useEffect(() => {
        posts.getData();
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
)(Home)