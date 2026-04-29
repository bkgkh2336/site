import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin: 0;
  font-size: 14px;
`;
