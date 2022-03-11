import "@testing-library/jest-dom";

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { addLightningTalk } from "@/apis";

import LightningTalkForm from "..";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

jest.mock("@/apis", () => ({
  addLightningTalk: jest.fn(),
}));

const mockAddLightningTalk = addLightningTalk as jest.Mock;

test("shows talk form when open the page", async () => {
  render(<LightningTalkForm />);

  expect(await screen.findByTestId("lightning-talk-form")).toBeInTheDocument();
});

test("shows error when fields are empty on submit", () => {
  render(<LightningTalkForm />);

  const submitBtn = screen.getByText("Create");
  fireEvent.click(submitBtn);

  const fieldNames = ["Name", "Title", "Description"];
  fieldNames.forEach((name) => {
    expect(screen.queryByText(`${name} is required`)).toBeInTheDocument();
  });
});

test.each([
  ["Name", "lightning-talk-form-user"],
  ["Title", "lightning-talk-form-title"],
  ["Description", "lightning-talk-form-description"],
])("removes error when fields are not empty on submit", (name, testid) => {
  render(<LightningTalkForm />);

  const submitBtn = screen.getByText("Create");
  fireEvent.click(submitBtn);

  const input = screen.getByTestId(testid);
  fireEvent.change(input, { target: { value: "hello" } });
  fireEvent.click(submitBtn);

  expect(screen.queryByText(`${name} is required`)).not.toBeInTheDocument();
});

test("submit input to api by clicking submit button when all input are valid", async () => {
  mockAddLightningTalk.mockResolvedValue({ error: null });

  render(<LightningTalkForm />);

  const testids = [
    ["lightning-talk-form-user", "Kurt"],
    ["lightning-talk-form-title", "Hello"],
    ["lightning-talk-form-description", "world"],
  ];
  testids.forEach(([testid, value]) => {
    const input = screen.getByTestId(testid);
    fireEvent.change(input, { target: { value } });
  });
  const submitBtn = screen.getByText("Create");
  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(mockAddLightningTalk).toBeCalledWith({
      description: "world",
      title: "Hello",
      user: "Kurt",
    });
  });
});
