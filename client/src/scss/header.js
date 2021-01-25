import styled from 'styled-components';

export const HeaderContainer = styled.nav`
	display: flex;
	justify-content: space-between;
	background-color: rgba(255, 102, 0);
  padding: 5px 10px;
  line-height: 1;
  font-weight: bold;

  > span > a {
    padding-right: 15px;
  }

  > span > a:active, > span > a:visited {
  	color: #000000;
  }

  > span > a:hover {
    color: #ffffff;
  }
`;