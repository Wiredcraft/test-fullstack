import React, { Component, createContext, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { SERVER_PATH } from './config';

interface ContextValueType {
	user?: any,
  logout?: () => any,
  login?: () => any,
  isLogin?: boolean
}


// create the context
export const Auth0Context: any = createContext<ContextValueType | null>(null);
export const useAuth0: any = () => useContext(Auth0Context);

interface IState {
	isLogin: boolean,
	user?: any;
}

// create a provider
export class Provider extends Component<{}, IState> {
	constructor(props: any) {
    super(props)
    this.state = {
      isLogin: false,
	    user: null
    }
	}

	componentDidMount() {
    this.checkLogin();
  }

	async getUser(token) {
		const res = await fetch(`${SERVER_PATH}auth/user`, {
		  method: 'get',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		  }
		});
    const data = await res.json();
    this.setState({
      user: data
    });
  };

  login = (token) => {
    this.getUser(token);
    this.setState({
      isLogin: true
    })
  }
  
  loginout = () => {
    sessionStorage.removeItem('token');
    this.setState({
      isLogin: false
    })
  }

  checkLogin = () => {
    const token = sessionStorage.getItem('token');
    if(token){
      this.login(token);
    }
  }

	render() {
    const { children } = this.props;
    const token = sessionStorage.getItem('token');
    const configObject = {
      user: this.state.user,
      logout: this.loginout,
      login: this.login,
      isLogin: this.state.isLogin
    }
		return <Auth0Context.Provider value={configObject}>{children}</Auth0Context.Provider>;
	}
}