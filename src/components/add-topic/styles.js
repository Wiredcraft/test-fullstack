import styled from 'styled-components';

export const Container = styled.div`
  margin: 4rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
  color: midnightblue;
`;

export const Input = styled.input`
  margin-bottom: 2rem;
  width: 80%;
  height: 1.25rem;

  ::placeholder {
    color: midnightblue;
  }
`;

export const TextArea = styled.textarea`
  margin-bottom: 2rem;
  width: 80%;
  height: 5rem;

  ::placeholder {
    color: midnightblue;
  }
`;
