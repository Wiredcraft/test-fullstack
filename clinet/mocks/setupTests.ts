import { configure } from "enzyme";
// @ts-ignore
import React16Adapter from "enzyme-adapter-react-16";

configure({ adapter: new React16Adapter() });
