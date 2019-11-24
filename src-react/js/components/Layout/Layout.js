import React from 'react'
import Header from '../Header'
import styled from 'styled-components';
import { Card } from 'antd';

const Container = styled(Card)`
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    cursor: default ;
`;

const Layout = ({ children }) => {
    return (
        <Container hoverable bordered>
            <Header ></Header>
            {children}
        </Container>
    )
}
export default Layout;