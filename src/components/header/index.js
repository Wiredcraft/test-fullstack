import React from 'react';

import { Container, Title } from './styles';
import Button from '../common/button';

const Header = () => (
  <Container>
    <Title>⚡️ Lightning Talks</Title>
    <Button>+ Add talk</Button>
  </Container>
);

export default Header;
