import {mount, shallow} from "enzyme";
import React from "react";
import Header from "./Header";

describe("Header", () => {
    it("renders the title", () => {
        const component = shallow(<Header />);
        expect(component).toMatchInlineSnapshot(`ShallowWrapper {}`);
        expect(component.find("h1").text()).toEqual("Hacker Talks");
    });

    it("renders the user name if given", () => {
        const component = shallow(<Header user={{name: "xpol"}} />);
        expect(component).toMatchInlineSnapshot(`ShallowWrapper {}`);
        expect(component.find("span").first().text()).toEqual("xpol");
    });

    it("renders the login link if user not given", () => {
        const component = shallow(<Header />);
        expect(component).toMatchInlineSnapshot(`ShallowWrapper {}`);
        expect(component.find("Link").first().text()).toEqual("login");
    });
});
