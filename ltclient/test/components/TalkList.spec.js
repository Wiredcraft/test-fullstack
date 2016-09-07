import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { TalkList } from '../../src/components/TalkList';
import Talk from '../../src/components/Talk';

const testProps = {
  fetchTalks: () => 'this is fetchTalks',
  vote: () => 'this is vote',
  talks: {
    isFetching: false,
    list: [
      { fakeProp: 'one' },
      { fakeProp: 'two' },
      { fakeProp: 'three' },
    ]
  }
};

function setup(props = testProps) {

  const wrapper = shallow(<TalkList {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - TalkList', () => {

  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('div').childAt(0).type())
      .toBe(Talk);
    expect(wrapper.find('Talk'))
      .toInclude({ length: 3 });

    expect(wrapper.find('div').childAt(0).props().fakeProp)
      .toBe('one');
    expect(wrapper.find('div').childAt(1).props().fakeProp)
      .toBe('two');
    expect(wrapper.find('div').childAt(2).props().fakeProp)
      .toBe('three');
  });

  it('should render loading animation while fetching', () => {
    let _props = Object.assign({}, testProps, {
      talks: {
        isFetching: true,
        // feeding some data intentionally
        list: [
          { fakeProp: 'one' },
          { fakeProp: 'two' },
        ],
      }
    });
    const { wrapper } = setup(_props);

    expect(wrapper.find('Talk'))
      .toInclude({ length: 0 });

    expect(wrapper.find('Loading'))
      .toInclude({ length: 1 });
  });
});

