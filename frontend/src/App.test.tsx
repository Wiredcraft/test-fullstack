import React from 'react';
import renderer, {ReactTestRendererJSON} from 'react-test-renderer';
import App from './App';

test('Initialize App component', () => {
  const component = renderer.create(<App/>);
  const tree = component.toJSON() as ReactTestRendererJSON;
  // expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual('div');
  // ...
});
