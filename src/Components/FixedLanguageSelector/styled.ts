import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
    gap: 10px;
  }
`;

export const AccessibilityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(40, 167, 69, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  color: #28a745;

  &:hover {
    background: rgba(40, 167, 69, 0.95);
    border-color: #28a745;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    color: white;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    padding: 8px;
  }
`;
