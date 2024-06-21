import React from 'react';
import { Grid, Button as MuiButton } from '@mui/material';
import styled from 'styled-components';

const ButtonGrid = ({
  onButtonClick,
  onEvaluate,
  onClear,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onScientificFunction,
  toggleRadians
}) => {
  const buttonValues = [
    'MC', 'MR', 'M+', 'M-',
    '(', ')', '2nd', 'x²',
    'x³', 'xʸ', 'eˣ', '10ˣ',
    '¹/x', '²√x', '³√x', 'ʸ√x',
    'ln', 'log₁₀', 'x!', 'sin',
    'cos', 'tan', 'e', 'EE',
    'Rad', 'sinh', 'cosh', 'tanh',
    'π', 'Rand', 'C', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  const handleButtonClick = (value) => {
    switch (value) {
      case '=':
        onEvaluate();
        break;
      case 'C':
        onClear();
        break;
      case 'MC':
        onMemoryClear();
        break;
      case 'MR':
        onMemoryRecall();
        break;
      case 'M+':
        onMemoryAdd();
        break;
      case 'M-':
        onMemorySubtract();
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'sinh':
      case 'cosh':
      case 'tanh':
      case 'ln':
      case 'log₁₀':
      case 'x²':
      case 'x³':
      case '²√x':
      case '³√x':
      case 'x!':
      case 'eˣ':
      case '10ˣ':
      case '¹/x':
      case 'π':
      case 'e':
      case 'Rand':
        onScientificFunction(value);
        break;
      case 'Rad':
        toggleRadians();
        break;
      default:
        onButtonClick(value);
    }
  };

  return (
    <ButtonGridContainer>
      {buttonValues.map((value, index) => (
        <Grid item xs={3} key={index}>
          <Button onClick={() => handleButtonClick(value)}>
            {value}
          </Button>
        </Grid>
      ))}
    </ButtonGridContainer>
  );
};

const ButtonGridContainer = styled(Grid).attrs(() => ({
  container: true,
  spacing: 1
}))`
  && {
    margin-top: 20px;
  }
`;

const Button = styled(MuiButton).attrs(() => ({
  variant: "contained",
  fullWidth: true,
  color: "primary"
}))`
  && {
    border-radius: 8px;
    font-size: 1.2rem;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.buttonHoverBackground};
      color: ${(props) => props.theme.text};
    }

    @media (max-width: 600px) {
      padding: 15px;
      font-size: 1rem;
    }
  }
`;

export default ButtonGrid;
