import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Description } from './styles';
import Button from '../common/button';

const EmptyList = () => {
  let navigate = useNavigate();

  return (
    <Container>
      <Description>No talks yet... Be the first!</Description>
      <Button
        onClick={() => {
          navigate('/add');
        }}
      >
        + Add your lightning talk
      </Button>
    </Container>
  );
};

export default EmptyList;
