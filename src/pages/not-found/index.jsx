import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Header } from '../../components/header';

const NotFoundStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
`;

export const NotFound = () => {
  return (
    <>
      <Header />
      <NotFoundStyled>
        <p>
          Page not found
          <br />
          <br />
          Go to&nbsp;<Link to="/talks">Talk Listing page</Link>
        </p>
      </NotFoundStyled>
    </>
  );
};
