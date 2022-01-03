import React from 'react';

import { Container, Description } from './styles';
import Button from '../common/button';

const Content = () => (
  <Container>
    <Description>No talks yet... Be the first!</Description>
    <Button>+ Add your lightning talk</Button>
  </Container>
);

export default Content;
