import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import useInput from "./useInput";

describe("useInput", () => {
  it("should init value", () => {
    const { result } = renderHook(() => useInput("test"));
    expect(result.current.value).toBe("test");
  });
  it("should auto bind input", () => {
    const { result } = renderHook(() => useInput("test"));
    render(<input data-testid="input" {...result.current.bind} />);

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "newValue" }
    });
    expect(result.current.value).toBe("newValue");
  });
  it("should can be setValue", () => {
    const { result } = renderHook(() => useInput("test"));
    render(<input data-testid="input" {...result.current.bind} />);
    act(() => {
      result.current.setValue("newValue");
    });
    expect(result.current.value).toBe("newValue");
  });
  it("should can be reset", () => {
    const { result } = renderHook(() => useInput("test"));
    render(<input data-testid="input" {...result.current.bind} />);
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe("");
  });
});
