import React, { FC } from "react";
// TODO: find out why this need disable this rule
// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ErrorBoundary from ".";

const Child: FC<{ throwError?: boolean }> = ({ throwError }) => {
  if (throwError) {
    throw new Error("test");
  }
  return <div>child</div>;
};

describe("test ErrorBoundary", () => {
  it("should render children", () => {
    const { container } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    expect(container.querySelector("div")).toHaveTextContent("child");
  });
  it("should render error", () => {
    const { container } = render(
      <ErrorBoundary>
        <Child throwError />
      </ErrorBoundary>
    );
    expect(container.querySelector("div")).toHaveTextContent(
      "Something went wrong."
    );
  });
});
