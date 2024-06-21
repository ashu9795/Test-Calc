import React from 'react';
import styled from 'styled-components';

const Display = ({ expression, result }) => {
  return (
    <DisplayContainer>
      <Expression>{expression}</Expression>
      <Result>{result}</Result>
    </DisplayContainer>
  );
};

const DisplayContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 80px;
  padding: 20px;
  font-size: 2rem;
  text-align: right;
  overflow: hidden;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    height: 60px;
    padding: 15px;
    font-size: 1.5rem;
  }
`;

const Expression = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

const Result = styled.div`
  color: grey;
  font-size: 1.5rem;
`;

export default Display;
