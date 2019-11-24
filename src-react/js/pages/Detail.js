import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {withRouter} from "react-router-dom";
import styled from 'styled-components';
import {API_BASEURL} from '@constants'

const Container = styled.div`
    h1{
        margin-top: 20px;
    }
    em{
        margin: 0 -10px;
    }
    em > span{
        padding: 0 10px;
    }
    p{
        margin-top: 20px;
        font-size: 20px;
        &::first-letter{
            font-size: 25px;
            text-transform: uppercase;
        }
    }
`;

const Detail = (props) => {
    const params = props.match.params
    const [data, setData] = useState({});
    useEffect(()=> {
        const init = async () => {
            const list = await axios.get(`${API_BASEURL}/talks/${params.id}`, );
            setData(list.data[0]);
        };
       init();
    }, []);
    return (
        <Container>
            <h1>{data.title}</h1>
            <em>
                <span>{data.authorName}</span>
                <span>{data.createdAt}</span>     
                <span>{data.voteCount}</span>  
            </em>
            <p>{data.content}</p>    
        </Container>
    )
}
export default withRouter(Detail);