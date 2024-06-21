import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick }) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button`
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }

  @media (max-width: 600px) {
    padding: 15px;
    font-size: 1rem;
  }
`;

export default Button;