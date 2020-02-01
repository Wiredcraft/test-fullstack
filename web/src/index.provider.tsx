import React, { Component, createContext, useContext } from 'react';


interface ContextValueType {
	isAuthenticated?: boolean,
	user?: any,
	isLoading?: boolean,
	handleRedirectCallback?: () => void,
	getIdTokenClaims?: (...p: any) => any,
	loginWithRedirect?: (...p: any) => any,
	getTokenSilently?: (...p: any) => any,
	logout?: (...p: any) => any
}


// create the context
export const Auth0Context: any = createContext<ContextValueType | null>(null);
export const useAuth0: any = () => useContext(Auth0Context);

interface IState {
	auth0Client: any,
	isLoading: boolean,
	isAuthenticated: boolean,
	user?: any;
}

// create a provider
export class Provider extends Component<{}, IState> {
	constructor(props: any) {
		super(props)
	}

	componentDidMount() {
	}

	

	render() {
		const { children } = this.props;

		

		return <Auth0Context.Provider>{children}</Auth0Context.Provider>;
	}
}