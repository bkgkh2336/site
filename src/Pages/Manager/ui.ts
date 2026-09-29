import styled, { css } from 'styled-components';

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.04);

  & + & {
    margin-top: 24px;
  }

  @media (max-width: 640px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #198754;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0 0;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #f6f8fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  font-size: 14px;
  color: #495057;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eef1f4;
  vertical-align: middle;
  font-size: 15px;
  color: #212529;
`;

export const Tr = styled.tr`
  transition: background 0.15s ease;

  &:hover {
    background: #f8fff9;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

const variantStyles = css<{ $variant?: ButtonVariant }>`
  background: ${({ $variant }) =>
    $variant === 'danger' ? '#dc3545' :
    $variant === 'secondary' ? '#6c757d' :
    $variant === 'ghost' ? '#f1f3f5' :
    '#28a745'};
  color: ${({ $variant }) => ($variant === 'ghost' ? '#495057' : '#ffffff')};

  &:hover {
    filter: brightness(${({ $variant }) => ($variant === 'ghost' ? '0.97' : '0.93')});
  }
`;

export const ActionButton = styled.button<{ $variant?: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease, filter 0.15s ease;
  ${variantStyles}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    filter: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 640px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

export const IconButton = styled.button<{ $tone?: 'green' | 'red' }>`
  background: ${({ $tone }) => ($tone === 'red' ? '#dc3545' : '#28a745')};
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: ${({ $tone }) => ($tone === 'red' ? '#c82333' : '#218838')};
    transform: scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 24, 40, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(16, 24, 40, 0.25);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 24px;
  border-bottom: 1px solid #eef1f4;
  font-weight: 700;
  font-size: 18px;
  color: #212529;
  flex-shrink: 0;
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  background: #f1f3f5;
  border: none;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6c757d;
  transition: background 0.15s ease, color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: #e9ecef;
    color: #212529;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

export const FieldHint = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 13px;
  color: ${({ $error }) => ($error ? '#dc3545' : '#6c757d')};
`;

export const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #198754;
  font-size: 14px;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const FileInput = styled.input`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  color: #495057;

  &::file-selector-button {
    margin-right: 12px;
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    background: #f1f3f5;
    color: #212529;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #e9ecef;
    }
  }
`;
