import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';

describe('<Navbar />', () => {
  test('should include the app title', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/piorun/)).toBeInTheDocument();
  });
});
