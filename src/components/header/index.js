import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title } from './styles';
import Button from '../common/button';

const Header = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Title onClick={() => navigate('/')}>⚡️ Lightning Talks</Title>
      <Button onClick={() => navigate('/add')}>+ Add talk</Button>
    </Container>
  );
};

export default Header;
