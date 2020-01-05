import React from "react";
import "jest-styled-components";
import { render } from "../../../../tests/utils";
import "../../../../tests/mock";
import Button from ".";

describe("test <Button />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Button variant="primary" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("should match snapshot", () => {
    const { container } = render(<Button variant="translucent" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
