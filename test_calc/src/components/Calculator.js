import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Paper, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

const math = create(all);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#333'
    },
    primary: {
      main: '#f39c12'
    },
    secondary: {
      main: '#ecf0f1'
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff'
    },
    primary: {
      main: '#f39c12'
    },
    secondary: {
      main: '#333'
    }
  }
});

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);
  const [useRadians, setUseRadians] = useState(false);
  const [theme, setTheme] = useState(darkTheme);
  const [history, setHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = (value) => {
    setExpression(prev => prev + value);
  };

  const evaluateExpression = () => {
    try {
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult.toString());
      setExpression(evaluatedResult.toString());
      setHistory(prevHistory => [...prevHistory, `${expression} = ${evaluatedResult}`]); // Corrected interpolation
    } catch {
      setResult('Error');
    }
  };
  

  const clearExpression = () => {
    setExpression('');
    setResult('');
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
    } catch {
      setResult('Error');
    }
  };

  const handleMemorySubtract = () => {
    try {
      const value = math.evaluate(expression);
      setMemory(memory - value);
    } catch {
      setResult('Error');
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
    } catch {
      setResult('Error');
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
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
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
          <button onClick={toggleTheme}>Toggle Theme</button>
          <History>
            <h3>History</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </History>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

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