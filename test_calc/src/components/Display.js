import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const Display = ({ expression, result }) => {
  return (
    <DisplayContainer>
      <Expression variant="h4" color="textPrimary">{expression}</Expression>
      <Result variant="h6" color="textSecondary">{result}</Result>
    </DisplayContainer>
  );
};

const DisplayContainer = styled(Box)`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  font-size: 2rem;
  text-align: right;
  overflow: hidden;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    padding: 15px;
    font-size: 1.5rem;
  }
`;

const Expression = styled(Typography)`
  white-space: nowrap;
  overflow-x: auto;
  color: black; /* Ensure text color is black */
`;

const Result = styled(Typography)`
  color: grey;
  font-size: 1.5rem;
`;

export default Display;
