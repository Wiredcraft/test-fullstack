import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import UserNav from '../../src/components/UserNav';

const testProps = {
  logout: expect.createSpy(),
  username: 'Alice',
};

function setup(props = testProps) {

  const wrapper = shallow(<UserNav {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - UserNav', () => {
  it('should render correctly', () => {

    const { wrapper } = setup();

    expect(wrapper.find('.header__user'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.header__usernav'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.header__usernav').childAt(0).text())
      .toBe('Alice');

    expect(wrapper.find('.header__usernav').childAt(1).props().name)
      .toBe('expand');
    expect(wrapper.find('.header__userdropdown'))
      .toInclude({ length: 1 });
  });

  it('should render correctly if no logged-in user', () => {

    const { wrapper } = setup({ logout: expect.createSpy() });

    expect(wrapper.find('.header__usernav'))
      .toInclude({ length: 0 });
    expect(wrapper.find('.header__userdropdown'))
      .toInclude({ length: 0 });
    expect(wrapper.find('.header__user').childAt(0).props().to)
      .toBe('login');
  });

  it('should call logout() on logout button clicked', () => {

    const { wrapper, props } = setup();

    expect(props.logout.calls.length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(props.logout.calls.length).toBe(1);
  });
});