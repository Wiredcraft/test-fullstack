import {AppDispatch} from '../store';
import {IAPIState} from './IAPI';
import {IUserState} from './IUser';

export interface IAppState {
    apiLoginUserReducer: IAPIState;
    apiRegisterUserReducer: IAPIState;
    userReducer: IUserState;
    dispatch: AppDispatch;
}

export interface IOwnProps {
    dispatch?: AppDispatch;
}

export interface IRootState {
    state: IAppState;
}

