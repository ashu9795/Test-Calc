import React, { useState } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import { create, all } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Create a mathjs instance with all functions
const math = create(all);

const lightTheme = {
  background: '#f3f3f3',
  text: '#000',
  buttonBackground: '#e0e0e0',
  buttonHoverBackground: '#d0d0d0',
  displayBackground: '#fff',
  border: '#ccc'
};

const darkTheme = {
  background: '#333',
  text: '#fff',
  buttonBackground: '#555',
  buttonHoverBackground: '#444',
  displayBackground: '#000',
  border: '#444'
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [memory, setMemory] = useState(0);
  const [useRadians, setUseRadians] = useState(true);
  const [theme, setTheme] = useState(lightTheme);
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (isResult && !isNaN(value)) {
      setExpression(value);
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
    setShowConfetti(false);
    setIsResult(false);
  };

  const evaluateExpression = () => {
    try {
      if (expression.includes('/0')) {
        setResult('Error');
        setExpression('');
        setIsResult(false);
        return;
      }
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult.toString());
      setExpression(evaluatedResult.toString());
      checkForConfetti(expression);
      setHistory((prevHistory) => [...prevHistory, `${expression} = ${evaluatedResult}`]);
      setIsResult(true);
    } catch (error) {
      setResult('Error');
      setExpression('');
      setIsResult(false);
    }
  };

  const clearExpression = () => {
    setExpression('');
    setResult('');
    setShowConfetti(false);
    setIsResult(false);
  };

  const checkForConfetti = (expression) => {
    if (expression.includes('5') && expression.includes('6')) {
      setShowConfetti(true);
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryRecall = () => {
    setExpression(memory.toString());
  };

  const handleMemoryAdd = () => {
    try {
      const value = math.evaluate(expression);
      setMemory(memory + value);
    } catch (error) {
      setResult('Error');
      setExpression('');
      setIsResult(false);
    }
  };

  const handleMemorySubtract = () => {
    try {
      const value = math.evaluate(expression);
      setMemory(memory - value);
    } catch (error) {
      setResult('Error');
      setExpression('');
      setIsResult(false);
    }
  };

  const handleScientificFunction = (func) => {
    try {
      let value = parseFloat(expression);
      if (!useRadians) {
        value = math.unit(value, 'deg').toNumber('rad');
      }
      let result;
      switch (func) {
        case 'sin':
          result = math.sin(value);
          break;
        case 'cos':
          result = math.cos(value);
          break;
        case 'tan':
          result = math.tan(value);
          break;
        case 'sinh':
          result = math.sinh(value);
          break;
        case 'cosh':
          result = math.cosh(value);
          break;
        case 'tanh':
          result = math.tanh(value);
          break;
        case 'ln':
          result = math.log(value);
          break;
        case 'log₁₀':
          result = math.log10(value);
          break;
        case 'x²':
          result = math.square(value);
          break;
        case 'x³':
          result = math.cube(value);
          break;
        case '²√x':
          result = math.sqrt(value);
          break;
        case '³√x':
          result = math.cbrt(value);
          break;
        case 'x!':
          result = math.factorial(value);
          break;
        case 'eˣ':
          result = math.exp(value);
          break;
        case '10ˣ':
          result = math.pow(10, value);
          break;
        case '¹/x':
          result = math.divide(1, value);
          break;
        case 'π':
          result = math.pi;
          break;
        case 'e':
          result = math.e;
          break;
        case 'Rand':
          result = Math.random();
          break;
        default:
          result = value;
      }
      setExpression(result.toString());
      setIsResult(true);
    } catch (error) {
      setResult('Error');
      setExpression('');
      setIsResult(false);
    }
  };

  const toggleRadians = () => {
    setUseRadians(!useRadians);
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CalculatorWrapper>
        <Display expression={expression} result={result} />
        <ButtonGrid
          onButtonClick={handleButtonClick}
          onEvaluate={evaluateExpression}
          onClear={clearExpression}
          onMemoryClear={handleMemoryClear}
          onMemoryRecall={handleMemoryRecall}
          onMemoryAdd={handleMemoryAdd}
          onMemorySubtract={handleMemorySubtract}
          onScientificFunction={handleScientificFunction}
          toggleRadians={toggleRadians}
        />
        {showConfetti && <ConfettiExplosion />}
        <button onClick={toggleTheme}>Toggle Theme</button>
        <History>
          <h3>History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </History>
      </CalculatorWrapper>
    </ThemeProvider>
  );
};

const CalculatorWrapper = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.text};
`;

const History = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  background-color: ${(props) => props.theme.displayBackground};
  color: ${(props) => props.theme.text};

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
`;

export default Calculator;
