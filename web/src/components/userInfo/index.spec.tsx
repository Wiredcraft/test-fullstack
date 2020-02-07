import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { renderHook, act } from '@testing-library/react-hooks';
import UserInfo from './index';

function renderUserInfo(token) {
    return render(
      <UserInfo token={token}></UserInfo>
    )
}

describe('UserInfo', () => {
  it('init', async () => {
    const { findByTestId, getByTestId } = await renderUserInfo('token');
    const userInfo = findByTestId('userInfo');
    
  })
});