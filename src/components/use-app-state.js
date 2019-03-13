import React from "react";

export const AppState = React.createContext();
export const Dispatch = React.createContext();

export default () => React.useContext(AppState);
export const useDispatch = () => React.useContext(Dispatch);
