import styled from 'styled-components';

export const HeaderContainer = styled.nav`
	display: flex;
	justify-content: space-between;
	background-color: rgba(255, 102, 0);
  	padding: 0 10px;

  > a {
	line-height: 1.7;
	font-weight: bold;
  }

  > a:active, >a:visited {
  	color: #000000
  }

  > a:hover {
    color: #ffffff
  }
`;