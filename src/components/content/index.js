import React from 'react';
import axios from 'axios';

import { Container, Description } from './styles';
import Button from '../common/button';

const Content = () => (
  <Container>
    <Description>No talks yet... Be the first!</Description>
    <Button
      onClick={() => {
        axios.get('http://localhost:3000/api').then(response => {
          console.log(response.data);
        });
      }}
    >
      + Add your lightning talk
    </Button>
  </Container>
);

export default Content;
