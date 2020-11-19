import {ApolloClient, InMemoryCache, createHttpLink, HttpOptions} from "@apollo/client";

const KEY = "token";

const loadToken = () => {
    const token = window.localStorage.getItem(KEY);
    if (!token) {
        return "";
    }
    return `Bearer ${token}`;
};

const uri = "http://localhost:3000";

const createLink = () => {
    const options: HttpOptions = {uri};

    const token = loadToken();
    if (token) {
        options.headers = {authorization: token};
    }

    return createHttpLink(options);
};

const client = new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache()
});

export const storeToken = async (token: string): Promise<void> => {
    if (!token) {
        return;
    }

    window.localStorage.setItem(KEY, token);
    const link = createLink();
    client.setLink(link);
    await client.clearStore();
};

export default client;
