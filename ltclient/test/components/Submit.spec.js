import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Submit } from '../../src/pages/Submit';

const testProps = {
  dispatch: expect.createSpy(),
  isFetching: false,
  userId: 1,
  justSubmitted: false,
};

function setup(props = testProps) {

  const wrapper = shallow(<Submit {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - Submit', () => {

  it('should render correctly', () => {

    const { wrapper } = setup();

    expect(wrapper.find('.main'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.form--submit'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.form__header'))
      .toInclude({ length: 1 });
    expect(wrapper.find('input'))
      .toInclude({ length: 3 });
    expect(wrapper.find('textarea'))
      .toInclude({ length: 1 });

    expect(wrapper.find('input').get(0).props.type)
      .toBe('text');
    expect(wrapper.find('textarea').get(0).props.name)
      .toBe('textarea');

    expect(wrapper.find('button').props().type)
      .toBe('submit');

    // no guest prompt
    expect(wrapper.find('.prompt'))
      .toInclude({ length: 0 });

  });

  it('should render correctly for non logged-in user', () => {

    const { wrapper } = setup(Object.assign(
      {},
      testProps,
      {
        userId: undefined,
      }
    ));

    expect(wrapper.find('.main'))
      .toInclude({ length: 1 });
    expect(wrapper.find('.prompt'))
      .toInclude({ length: 1 });
  });
});