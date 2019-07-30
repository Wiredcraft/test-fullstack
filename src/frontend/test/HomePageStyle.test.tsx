import 'jsdom-global/register'
import * as React from 'react'
import { shallow } from 'enzyme'
import * as Elements from '../app/pages/HomePageStyles'

const DomElms: any = Elements

test('Element of FlexRow should be mounted', () => {
  const wrapper = shallow(<DomElms.FlexRow />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of Container should be mounted', () => {
  const wrapper = shallow(<DomElms.Container />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostContainer should be mounted', () => {
  const wrapper = shallow(<DomElms.PostContainer />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostWrapper should be mounted', () => {
  const wrapper = shallow(<DomElms.PostWrapper />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostInfo should be mounted', () => {
  const wrapper = shallow(<DomElms.PostInfo />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostPropLabel should be mounted', () => {
  const wrapper = shallow(<DomElms.PostPropLabel />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of FlexRow should be mounted', () => {
  const wrapper = shallow(<DomElms.FlexRow />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostTitle should be mounted', () => {
  const wrapper = shallow(<DomElms.PostTitle />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostAuthor should be mounted', () => {
  const wrapper = shallow(<DomElms.PostAuthor />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostDesc should be mounted', () => {
  const wrapper = shallow(<DomElms.PostDesc />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostDate should be mounted', () => {
  const wrapper = shallow(<DomElms.PostDate />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of PostUpvotes should be mounted', () => {
  const wrapper = shallow(<DomElms.PostUpvotes />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of ButtonUniverse should be mounted', () => {
  const wrapper = shallow(<DomElms.ButtonUniverse />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostModal should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostModal />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostInner should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostInner />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostWrapper should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostWrapper />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostRow should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostRow />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostLabel should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostLabel />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostTextArea should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostTextArea />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostSubmit should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostSubmit />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of Footer should be mounted', () => {
  const wrapper = shallow(<DomElms.Footer />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of NewPostTextArea should be mounted', () => {
  const wrapper = shallow(<DomElms.NewPostTextArea />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of FooterIntro should be mounted', () => {
  const wrapper = shallow(<DomElms.FooterIntro />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of Logout should be mounted', () => {
  const wrapper = shallow(<DomElms.Logout />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of LoadingWrapper should be mounted', () => {
  const wrapper = shallow(<DomElms.LoadingWrapper />)
  expect(wrapper).toMatchSnapshot()
})
test('Element of Loading should be mounted', () => {
  const wrapper = shallow(<DomElms.Loading />)
  expect(wrapper).toMatchSnapshot()
})
