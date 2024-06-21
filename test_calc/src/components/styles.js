import styled from 'styled-components';

export const CalculatorWrapper = styled.div`
  width: 400px;
  height: 600px;
  background: #f1f3f4;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

export const DisplayWrapper = styled.div`
  width: 100%;
  background: #000;
  color: #fff;
  text-align: right;
  padding: 10px;
  font-size: 2em;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const ButtonGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const ButtonWrapper = styled.button`
  width: 100%;
  padding: 20px;
  font-size: 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;
