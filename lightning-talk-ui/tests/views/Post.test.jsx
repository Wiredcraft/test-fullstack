import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Formik } from 'formik';
import { PostForm } from '@/views/Post';

describe('Post page', () => {
  const wrapper = shallow(<PostForm history={{}} />);

  it('should render post form', () => {
    expect(wrapper.find(Formik)).to.have.lengthOf(1);
  });
});
