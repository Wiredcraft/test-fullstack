import React, { useState } from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Container = styled(Menu)`
  /* ${Row}{
    text-align: center;
  }
  ${Col}{
    text-align: center;
  } */
  background-color: orange;
`;
const  Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    {
      url: '/',
      name: 'homepage',
    },
    {
      url: '/newest',
      name: 'newest',
    },
    {
      url: '/past',
      name: 'past',
    },
    {
      url: '/comment',
      name: 'comment',
      disabled: true,
    },
    {
      url: '/submit',
      name: 'submit',
    },
  ]
  return (
    <Container selectedKeys={[activeIndex]} mode="horizontal">
      {
        menuList.map((menu, index) => {
          return (
            <Menu.Item key={index} onClick={() => setActiveIndex(index)} disabled={menu.disabled}>
              <Link to={menu.url}>
                {menu.name}
              </Link>
            </Menu.Item>
          );
        })
      }
    </Container>
  );
}

export default Header;