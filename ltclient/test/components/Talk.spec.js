import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Talk from '../../src/components/Talk';

const testProps = {
  vote: expect.createSpy(),
  title: 'hello',
  id: 2,
  cover: 'http://google.com/google.png',
  speaker: 'John',
  description: 'Dump description',
  submitter: 'haishan',
  createdAt: '3 hours ago',
  upvote: 10,
  voted: false,
};

function setup(props) {
  props = props || testProps;
  const wrapper = shallow(<Talk {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components - Talk', () => {

  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.talk'))
      .toInclude({ length: 1 });

    /* cover */
    expect(wrapper.find('img').props().src)
      .toBe('http://google.com/google.png');
    expect(wrapper.find('.cover__overlay').children().props().name)
      .toBe('play');

    expect(wrapper.find('.talk__title').text().trim())
      .toBe('hello');
    expect(wrapper.find('.talk__speaker').text().trim())
      .toBe('John');
    expect(wrapper.find('.talk__description').text().trim())
      .toBe('Dump description');
    expect(wrapper.find('.talk__footer').text().trim())
      .toBe('submitted by haishan, 3 hours ago');

    /* button */
    expect(wrapper.find('.talk__vote'))
      .toInclude({ length: 1 });
    // not voted yet
    expect(wrapper.find('.voted'))
      .toInclude({ length: 0 });
    expect(wrapper.find('.upvote').text().trim())
      .toBe('10');
  });

  it('should call vote() on vote button click', () => {
    const { props, wrapper } = setup();

    expect(props.vote.calls.length).toBe(0);
    wrapper.find('.talk__vote').simulate('click');
    expect(props.vote.calls.length).toBe(1);
  });

  it('should use proper className if talk already voted', () => {
    const { props, wrapper } = setup(Object.assign({}, testProps, {
      voted: true
    }));

    expect(wrapper.find('.voted'))
      .toInclude({ length: 1 });
  });

});