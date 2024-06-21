import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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
    { value: '(' }, { value: ')' }, { value: 'MC' }, { value: 'M+' }, { value: 'M-' },
    { value: 'MR' }, { value: 'C' }, { value: '+/-' }, { value: '%' }, { value: '/' },
    { value: '2nd' }, { value: 'x²' }, { value: 'x³' }, { value: 'xʸ' }, { value: 'eˣ' },
    { value: '10x' }, { value: '7', style: { backgroundColor: 'lightgrey' } },
    { value: '8', style: { backgroundColor: 'lightgrey' } }, { value: '9', style: { backgroundColor: 'lightgrey' } }, { value: '*' },
    { value: '¹/x' }, { value: '²√x' }, { value: '³√x' }, { value: 'ʸ√x' }, { value: 'In' },
    { value: 'log10' }, { value: '4', style: { backgroundColor: 'lightgrey' } },
    { value: '5', style: { backgroundColor: 'lightgrey' } }, { value: '6', style: { backgroundColor: 'lightgrey' } }, { value: '-' },
    { value: 'x!' }, { value: 'sin' }, { value: 'cos' }, { value: 'tan' }, { value: 'e' },
    { value: 'EE' }, { value: '1', style: { backgroundColor: 'lightgrey' } },
    { value: '2', style: { backgroundColor: 'lightgrey' } }, { value: '3', style: { backgroundColor: 'lightgrey' } }, { value: '+' },
    { value: 'Rad' }, { value: 'sinh' }, { value: 'cosh' }, { value: 'tanh' }, { value: 'π' },
    { value: 'Rand', style: { marginBottom: '20px' } }, // Adjusted margin-bottom for Rand button
    { value: '0', style: { backgroundColor: 'lightgrey', outerWidth: 200 } },
    { value: '.' }, { value: '=' }
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
      {buttonValues.map(({ value, style }, index) => (
        <Button key={index} onClick={() => handleButtonClick(value)} style={style}>
          {value}
        </Button>
      ))}
    </ButtonGridContainer>
  );
};

const ButtonGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr)); /* 10 columns */
  grid-template-rows: repeat(5, minmax(0, auto)); /* 5 rows */
  gap: 10px;
  padding: 10px;
`;

export default ButtonGrid;
