import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Login from '@/views/Login';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

describe('Login page', () => {
  const wrapper = shallow(<Login />);

  it('should render login form', () => {
    expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
  });

  it('should render register button', () => {
    expect(wrapper.find('.btn--text')).to.have.lengthOf(1);
  });

  it('should render register form', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find(RegisterForm)).to.have.lengthOf(1);
  });
});
