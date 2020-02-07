import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '../../index.provider';
import App from '../../App';

function renderLayout() {
    return render(
      <Provider>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </Provider>
    )
}

describe('Layout', () => {
  it('has these children', async () => {
    const {findByTestId, getByTestId} = renderLayout();
    const page = await findByTestId('page');
    const header = await getByTestId('header');
    const container = await getByTestId('container');
    expect(page).toBeInTheDocument();
    expect(page).toContainElement(header);
    expect(page).toContainElement(container);
  })
});