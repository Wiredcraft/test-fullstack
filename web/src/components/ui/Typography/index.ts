import styled, { css } from "styled-components";
import { ellipsis as ellipsisCSS } from "polished";

interface Props {
  ellipsis?: boolean;
}

const sharedStyle = css<Props>`
  ${({ ellipsis }) => (ellipsis ? ellipsisCSS() : "")};
  margin: 0;
  padding: 0;
`;

export const H4 = styled.h4<Props>`
  ${sharedStyle};
  font-size: 24px;
  line-height: 28px;
  font-weight: 500;
  color: ${({ theme: { colors } }) => colors.text.base};
`;

export const Body1 = styled.div<Props>`
  ${sharedStyle};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme: { colors } }) => colors.text.base};
`;

export const Caption = styled.span<Props>`
  ${sharedStyle};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme: { colors } }) => colors.text.light};
`;
