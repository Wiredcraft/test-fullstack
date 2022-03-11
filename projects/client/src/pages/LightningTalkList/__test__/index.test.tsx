import "@testing-library/jest-dom";

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getLightningTalks, addPoll } from "@/apis";

import LightningTalkList from "..";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));

jest.mock("@/apis", () => ({
  getLightningTalks: jest.fn(),
  addPoll: jest.fn(),
}));

const mockGetLightningTalks = getLightningTalks as jest.Mock;
const mockAddPoll = addPoll as jest.Mock;

const mockTalksResponse = [
  {
    id: 1,
    user: "apple",
    title: "Bugs in Hello World",
    description:
      "Hello World might be the most frequently written computer program.",
    date_created: "2022-03-07T16:00:00.000Z",
    poll: 16,
  },
  {
    id: 2,
    user: "banana",
    title: "How to get the most out of your 1:1s",
    description: "As a Director of Engineering.",
    date_created: "2022-03-05T16:00:00.000Z",
    poll: 1,
  },
  {
    id: 3,
    user: "cat",
    title: "Ask Slashdot: How Powerful is Your Computer?",
    description: "All of us have, at one time or another.",
    date_created: "2022-02-17T16:00:00.000Z",
    poll: 6,
  },
];

beforeEach(() => {
  mockGetLightningTalks.mockResolvedValue({
    error: null,
    data: mockTalksResponse,
  });
});

test("shows loading message when open the page", async () => {
  render(<LightningTalkList />);

  expect(screen.queryByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Loading...")).not.toBeInTheDocument();
});

test("shows an empty message when the list is empty", async () => {
  mockGetLightningTalks.mockResolvedValueOnce({ error: null, data: [] });

  render(<LightningTalkList />);

  expect(
    await screen.findByText("Create You Own Talk Now!")
  ).toBeInTheDocument();
});

test("shows talk list on the page when the list is not empty", async () => {
  render(<LightningTalkList />);

  expect(await screen.findByText("Bugs in Hello World")).toBeInTheDocument();
});

test("calls addPoll api when click a polling button", async () => {
  render(<LightningTalkList />);

  const pollBtn = await screen.findByTestId("lightning-talk-poll-btn-1");
  fireEvent.click(pollBtn);

  await waitFor(() => {
    expect(mockAddPoll).toBeCalledWith(1);
  });
});

test("orders talk list by poll amount desc", async () => {
  render(<LightningTalkList />);

  const talks = await screen.findAllByTestId("lightning-talk-poll-btn", {
    exact: false,
  });

  const expectedOrder = [
    "lightning-talk-poll-btn-1",
    "lightning-talk-poll-btn-3",
    "lightning-talk-poll-btn-2",
  ];

  expectedOrder.forEach((testId, index) => {
    expect(talks[index].getAttribute("data-testid")).toBe(testId);
  });
});
