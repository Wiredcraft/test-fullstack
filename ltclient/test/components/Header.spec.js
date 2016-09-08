import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../src/components/Header';

const testProps = {
  dispatchLogout: () => 'whatever',
  username: 'Alice',
  error: 'hello'
};

function setup(props = testProps) {

  const wrapper = shallow(<Header {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - Header', () => {

  it('should render correctly', () => {

    const { wrapper } = setup();

    expect(wrapper.find('.header'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.header__inner'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.header__logo'))
      .toInclude({ length: 1 });

    expect(wrapper.find('UserNav').props().username)
      .toBe('Alice');

    expect(wrapper.find('UserNav').props().logout())
      .toBe('whatever');

    expect(wrapper.find('Message').props().message)
      .toBe('hello');
  });
});