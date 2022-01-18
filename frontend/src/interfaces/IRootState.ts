import {AppDispatch} from '../store';
import {IAPIAuthState} from './IAPI';
import {IUserState} from './IUser';

export interface IAppState {
    apiLoginUserReducer: IAPIAuthState;
    apiRegisterUserReducer: IAPIAuthState;
    userReducer: IUserState;
    dispatch: AppDispatch;
}

export interface IOwnProps {
    dispatch?: AppDispatch;
}

export interface IRootState {
    state: IAppState;
}

