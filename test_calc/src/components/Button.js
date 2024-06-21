import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ children, onClick }) => {
  return (
    <ButtonStyled onClick={onClick} isSpecial={isSpecial(children)} isNumeric={isNumeric(children)} isWide={children === '0'}>
      {children}
    </ButtonStyled>
  );
};

const isSpecial = (value) => {
  return ['+', '-', '*', '/', '='].includes(value);
};

const isNumeric = (value) => {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(value);
};

const ButtonStyled = styled.button`
  background-color: ${(props) => (props.isSpecial ? '#FFA500' : (props.isNumeric ? '#303030' : '#e0e0e0'))};
  color: ${(props) => (props.isSpecial || props.isNumeric ? '#fff' : '#000')};
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: .7rem; /* Adjust font size as needed */
  padding: 10px 20%; /* Adjust padding for height and width */
  
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSpecial ? '#FF8C00' : (props.isNumeric ? '#434343' : '#d0d0d0'))};
  }

  @media (max-width: 600px) {
    padding: 10px 15px; /* Adjust smaller padding for mobile */
    font-size: 1rem; /* Adjust font size for mobile */
  }

  ${(props) =>
    props.isWide &&
    css`
      grid-column: span 2; /* Makes the button span 2 columns */
      padding: 15px 20px; /* Adjust padding as needed */
    `}
`;

export default Button;
