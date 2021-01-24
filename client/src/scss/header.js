import styled from 'styled-components';

export const HeaderContainer = styled.nav`
	display: flex;
	justify-content: space-between;
	background-color: rgba(255, 102, 0);
  padding: 0 10px;
  line-height: 1;
  font-weight: bold;
  padding: 5px;

  > span > a {}

  > span > a:active, > span > a:visited {
  	color: #000000;
  }

  > span > a:hover {
    color: #ffffff;
  }
`;