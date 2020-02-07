import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { renderHook, act } from '@testing-library/react-hooks';
import Header from './header';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../userInfo', () => {
  return jest.fn(() => (
    <div>UserInfo</div>
  ))
});

async function renderHeader() {
  const {findByTestId, getByTestId} = render(
    <Header />
  );
  const header = await findByTestId('header');
  const logo = await getByTestId('logo');
  return {
    header,
    logo
  }
}

describe('Header', () => {
  
  it('has these children', async () => {
    const {header, logo} = await renderHeader();
    expect(header).toContainElement(logo);
  });

  it('logo can be clicked', async () => {
    const {logo} = await renderHeader();
    const gotoHome = jest.spyOn(logo, 'click');
    logo.click()
    expect(gotoHome).toHaveBeenCalled();
    gotoHome.mockRestore();
  });
});