import React from "react";
import "jest-styled-components";
import { render } from "../../../../tests/utils";
import "../../../../tests/mock";
import { H4, Body1, Caption } from ".";

describe("test <Typography />", () => {
  it("should match snapshot", () => {
    const { container } = render(<H4>Test</H4>);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("should match snapshot", () => {
    const { container } = render(<Body1>Test</Body1>);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("should match snapshot", () => {
    const { container } = render(<Caption>Test</Caption>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
