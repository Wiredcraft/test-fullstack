import {IUserReducer} from './IReducer';

export interface IAppState {
    loginUserReducer: IUserReducer;
    registerUserReducer: IUserReducer;
}

export interface IRootState {
    state: IAppState;
}

