import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import ConfettiExplosion from 'react-confetti-explosion'; // Import the ConfettiExplosion component

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
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti visibility

  const handleButtonClick = (value) => {
    setExpression(prev => prev + value);
    setShowConfetti(false); // Reset confetti when new input is entered
  };

  const evaluateExpression = () => {
    try {
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult.toString());
      setExpression(evaluatedResult.toString());
      setHistory(prevHistory => [...prevHistory, `${expression} = ${evaluatedResult}`]);
      
      // Check if expression involves 5 and 6
      if (expression.includes('5') && expression.includes('6')) {
        setShowConfetti(true); // Trigger confetti explosion
      }
    } catch {
      setResult('Error');
    }
  };

  const clearExpression = () => {
    setExpression('');
    setResult('');
    setShowConfetti(false); // Clear confetti on clear
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryRecall = () => {
    setExpression(memory.toString());
    setShowConfetti(false); // Reset confetti when memory is recalled
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
        case 'x²': // Square function
          result = math.square(value);
          break;
        case 'x³':
          result = math.cube(value);
          break;
        case 'xʸ':
          result = math.pow(value, parseFloat(expression.slice(expression.indexOf('x') + 1)));
          break;
        case 'ʸ√x':
          result = math.nthRoot(value, parseFloat(expression.slice(expression.indexOf('ʸ') + 1)));
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
        case '+/-':
          result = -value;
          break;
        case '%':
          result = math.divide(value, 100);
          break;
        default:
          result = value;
      }
      if (isNaN(result)) {
        throw new Error('Invalid operation');
      }
      setExpression(result.toString());
    } catch (error) {
      console.error('Error in handleScientificFunction:', error);
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
          <Button onClick={toggleTheme} variant="contained" color="primary" sx={{ mt: 2 }}>Toggle Theme</Button>
          <History>
            <h3>History</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </History>
          {showConfetti && <ConfettiExplosion />} {/* Render confetti if showConfetti is true */}
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
