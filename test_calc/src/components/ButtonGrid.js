import React from 'react';
import Button from './Button';
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
    if (value === '=') {
      onEvaluate();
    } else if (value === 'C') {
      onClear();
    } else if (value === 'MC') {
      onMemoryClear();
    } else if (value === 'MR') {
      onMemoryRecall();
    } else if (value === 'M+') {
      onMemoryAdd();
    } else if (value === 'M-') {
      onMemorySubtract();
    } else if (['x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', 'x!', 'sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'π', 'e', 'Rand'].includes(value)) {
      onScientificFunction(value);
    } else if (value === 'Rad') {
      toggleRadians();
    } else {
      onButtonClick(value);
    }
  };

  return (
    <ButtonGridContainer>
      {buttonValues.map((value, index) => (
        <Button key={index} onClick={() => handleButtonClick(value)}>
          {value}
        </Button>
      ))}
    </ButtonGridContainer>
  );
};

const ButtonGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

export default ButtonGrid;