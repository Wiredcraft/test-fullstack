import React from 'react';
import GithubIcon from '../../components/icons/github';

export default class AuthIndex extends React.Component {
  render() {
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? 'https://stefan-wc-test.herokuapp.com'
        : 'http://127.0.0.1:3001';

    const githubPath = `${BASE_URL}/api/v1/auth/github`;

    return (
      <div className="w-full flex items-start justify-center">
        <div className="flex flex-col items-center justify-start bg-pure-white px-12 pb-12">
          <h2 className='text-5xl'>Login</h2>
          <p>Please login with one of the methods below:</p>
          <a
            type="button"
            href={githubPath}
            className="w-full flex items-center justify-center text-white bg-black">
            <span className="px-3 py-2">
              <GithubIcon size={32} />
            </span>
            <span className="text-3xl text-bold">Github</span>
          </a>
        </div>
      </div>
    );
  }
}
