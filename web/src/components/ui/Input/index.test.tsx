import React from "react";
import "jest-styled-components";
import { render } from "../../../../tests/utils";
import "../../../../tests/mock";
import Input from ".";

describe("test <Input />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
