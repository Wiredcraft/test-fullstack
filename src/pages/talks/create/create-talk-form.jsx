import * as React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { InputField } from '../../../components/input-field';

const FormStyled = styled.form`
  padding: ${props => props.theme.gridSize}px
    ${props => props.theme.gridSize * 2}px;
`;

export const CreateTalkForm = () => {
  const formik = useFormik({
    initialValues: {}
  });

  return (
    <FormStyled>
      <InputField label="Title" />
      <InputField label="Description" />
    </FormStyled>
  );
};
