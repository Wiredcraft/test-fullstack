import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

module.exports = { shallow, mount, expect };