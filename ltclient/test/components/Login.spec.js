import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/pages/Login';

const testProps = {
  dispatch: expect.createSpy(),
  isFetching: false,
};

function setup(props = testProps) {

  const wrapper = shallow(<Login {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - Login', () => {

  it('should render correctly', () => {

    const { wrapper } = setup();

    expect(wrapper.find('.main'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.login-form'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.login-form__header'))
      .toInclude({ length: 1 });
    expect(wrapper.find('input'))
      .toInclude({ length: 2 });
    expect(wrapper.find('input').get(0).props.type)
      .toBe('text');
    expect(wrapper.find('input').get(1).props.type)
      .toBe('password');
    expect(wrapper.find('button').props().type)
      .toBe('submit');
    expect(wrapper.find('.login-form__footer'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.login-form__footer').childAt(1).props().to)
      .toBe('signup');
  });

  it('should able to submit login form', () => {

    const { wrapper, props } = setup();

    wrapper.find('input').first().simulate(
      'change',
      {target: {value: 'alice'}}
    );
    wrapper.find('input').last().simulate(
      'change',
      {target: {value: 'alice'}}
    );

    expect(props.dispatch.calls.length).toBe(0);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(props.dispatch.calls.length).toBe(1);

  });
});


