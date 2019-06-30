/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

const StyledNav = styled.ul`
  padding: 1rem;
  border: 1px solid rgb(198, 198, 198);
  position: fixed;
  width: 100%;
  display: block;
  background: #fff;
`;

function Menu() {
  return (
    <StyledNav>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/addproduct">Add product</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </StyledNav>
  );
}

export default Menu;
