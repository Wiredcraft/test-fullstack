import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 0.5rem 0 1.5rem;
`;

export const RatingDisplay = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: midnightblue;
  width: 3rem;
  font-variant-numeric: tabular-nums;
  user-select: none;
`;

export const UpButton = styled.div`
  display: inline-block;
  border-left: 0.75rem solid transparent;
  border-right: 0.75rem solid transparent;
  border-top: 0.75rem solid transparent;
  border-bottom: calc(2 * 0.75rem * 0.866) solid darkorange;
  position: relative;
  bottom: 1.33rem;
  cursor: pointer;
`;

export const DownButton = styled.div`
  display: inline-block;
  border-left: 0.75rem solid transparent;
  border-right: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
  border-top: calc(2 * 0.75rem * 0.866) solid darkorange;
  position: relative;
  bottom: -1.33rem;
  left: -1.5rem;
  cursor: pointer;
`;
