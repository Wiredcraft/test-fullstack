import styled from 'styled-components';

export const PollsWrapper = styled.ul`
  padding-top: 10px;
  border-top: 1px solid #cccccc;

  &:first-of-type {
    border-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const PollTitle = styled.h5`
  margin-bottom: 5px;
  font-size: 18px;
  line-height: 1.8;
  margin: 0;
  text-decoration: none;

  a {
    color: #2e2e2c;
    background-color: #f8dc3d;
    text-decoration: none;
  }
`;

export const PollMeta = styled.p`
  font-style: italic;

  > span:first-child {
    margin-right: 10px;
  }

  > span:not(:first-child):before {
    content: '•'
    margin: 0 7px;
  }

  .story__meta-bold {
    font-weight: bold;
  }
`;

export const PollMetaElement = styled.span`
  font-weight: bold;
  color: ${props => props.color};
`;
