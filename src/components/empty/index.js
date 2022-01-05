import React from 'react';

import { Container, Description } from '../empty/styles';
import Button from '../common/button';

const Empty = () => (
  <Container>
    <Description>No talks yet... Be the first!</Description>
    <Button
      onClick={() => {
        // axios.get('/').then(response => {
        //   console.log(response.data);
        // });
      }}
    >
      + Add your lightning talk
    </Button>
  </Container>
);

export default Empty;
