import { GraphQLClient } from 'graphql-request'

const graphql = (config = {}) => {
    const { 
        endpoint = '/graphql', 
        options = {
            credentials: 'include'
        } 
    } = config;
    return new GraphQLClient(endpoint, options);
}

export default graphql;