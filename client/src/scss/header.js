import styled from 'styled-components';

export const HeaderContainer = styled.nav`
	display: flex;
	justify-content: flex-start;
	background-color: rgba(255, 102, 0);
  	padding: 0 10px;


  &:last-of-type {
    align-self: flex-end
    padding-right: 0;
  }

  > a {
	line-height: 1.7;
	font-weight: bold;
  padding-right: 15px;
  }

  > a:active, >a:visited {
  	color: #000000
  }

  > a:hover {
    color: #ffffff
  }
`;