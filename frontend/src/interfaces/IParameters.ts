import HTTPMethod from 'src/types/HTTPMethod';

interface IParameters {
    method?: HTTPMethod;
    body?: string;
    headers?: {[key: string]: string};
}

export default IParameters;
