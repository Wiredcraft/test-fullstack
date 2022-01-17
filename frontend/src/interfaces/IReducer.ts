import {IAPIResponse, IAPIError} from './IAPI';

export interface IUserReducer {
    loading?: boolean;
    response?: IAPIResponse;
    error?: IAPIError;
}
