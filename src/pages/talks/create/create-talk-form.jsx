import * as React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { InputField } from '../../../components/input-field';
import { TextAreaField } from '../../../components/textarea-field';
import { Button } from '../../../components/button';
import IcBtnCancel from '../../../assets/ic-btn-cancel.svg';
import IcBtnAdd from '../../../assets/ic-btn-add.svg';

const FormStyled = styled.form`
  padding: ${props => props.theme.gridSize}px
    ${props => props.theme.gridSize * 2}px;
`;

const ButtonStyled = styled(Button)`
  margin-left: ${props => props.theme.gridSize * 2}px;
  padding: 0 ${props => props.theme.gridSize * 2}px 0
    ${props => props.theme.gridSize}px;
  height: ${props => props.theme.gridSize * 6}px;
  border-radius: 2px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.gridSize * 6}px;
`;

export const CreateTalkForm = () => {
  const formik = useFormik({
    initialValues: {}
  });

  return (
    <FormStyled>
      <InputField label="Title" />
      <TextAreaField label="Description" rows={4} />
      <ButtonsGroup>
        <ButtonStyled inverted icon={<IcBtnCancel />}>
          Cancel
        </ButtonStyled>
        <ButtonStyled primary icon={<IcBtnAdd />}>
          Post
        </ButtonStyled>
      </ButtonsGroup>
    </FormStyled>
  );
};
