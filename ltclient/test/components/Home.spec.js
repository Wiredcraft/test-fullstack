import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../src/pages/Home';

// this is necessary, since this `TalkList` is redux connected
// we need the **identity**
import TalkList from '../../src/components/TalkList';

describe('components - Home', () => {

  it('should render correctly', () => {

    const wrapper = shallow(<Home />);

    expect(wrapper.find('.main'))
      .toInclude({ length: 1 });

    expect(wrapper.find('.main').childAt(0).type())
      .toBe(TalkList);

    expect(wrapper.find('.main').childAt(1))
      .toEqual(wrapper.find('.addtalk'));
  });
});