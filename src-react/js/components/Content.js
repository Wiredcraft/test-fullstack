import React from 'react'
import styled from 'styled-components';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Table } from 'antd';

const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    //   render: text => <a>{text}</a>,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
        title: 'createdAt',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: text => moment(text).toNow()
    },
    {
      title: 'authorName',
      key: 'authorName',
      dataIndex: 'authorName',
    },
    {
        title: 'voteCount',
        dataIndex: 'voteCount',
        key: 'voteCount',
        align: 'center',
        sorter: (a, b) => a.voteCount - b.voteCount,
        ellipsis: true,
    },
    {
        title: 'actions',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
        render: (id) => <Link to={`/talks/${id}`}>detail</Link>
    },
];


const Container = styled(Table)`
    /* *{
        margin:0;
        padding:0;
    }
    .list-title{
        display: flex;
        align-items: center;
    }
    .list-description{
        display: flex;
        align-items: center;
    } */
`;
const Content = ({posts}) => {
    if (posts.data.length <=0 ) {
        return (
            <Link to="/submit">no talk now, please submit your talk first</Link>
        )
    }
    const data = posts.data.map(d => {
        return {
            key: d.id,
            ...d
        }
    }) 
    console.log(data);
    return (
        <Container
            columns={columns}
            dataSource={data}
        />
    )
}

const mapStateToProps = ({ posts }) => ({
    posts,
});

export default connect(
    mapStateToProps,
    null
)(Content)