import React from 'react';
import GithubIcon from '../../components/icons/github';

export default class AuthIndex extends React.Component {
  render() {
    return (
      <div className="w-full flex items-start justify-center">
        <div className="flex flex-col items-center justify-start">
          <h2>Login</h2>
          <p>Please login with one of the methods below:</p>
          <button
            type="button"
            className="w-full flex items-center justify-center text-white bg-black">
            <span className="px-3 py-2">
              <GithubIcon size={32} />
            </span>
            <span className="text-3xl text-bold">Github</span>
          </button>
        </div>
      </div>
    );
  }
}
