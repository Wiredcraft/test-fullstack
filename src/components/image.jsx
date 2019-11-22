import * as React from 'react';
import styled from 'styled-components';

const ImgStyled = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Image = ({ src, width, height }) => {
  console.log(src);
  return (
    <ImgStyled
      style={{
        backgroundImage: `url(${src})`,
        width: width || height,
        height: height || width
      }}
    />
  );
};
