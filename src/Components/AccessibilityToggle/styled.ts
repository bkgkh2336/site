import styled from 'styled-components';

export const AccessibilityButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 10px;
  background: ${props => props.$isActive ? '#28a745' : 'rgba(255, 255, 255, 0.95)'};
  border: 2px solid ${props => props.$isActive ? '#28a745' : 'rgba(40, 167, 69, 0.3)'};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  color: ${props => props.$isActive ? 'white' : '#28a745'};

  &:hover {
    background: ${props => props.$isActive ? '#1e7e34' : 'rgba(40, 167, 69, 0.95)'};
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

export const BVIPanel = styled.div`
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 320px;
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: calc(100vw - 30px);
    right: 15px;
  }
`;

export const BVIPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #28a745;
  color: white;
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const BVIPanelContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const BVISection = styled.div`
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const BVISectionTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BVIButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const BVIButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  border: 2px solid ${props => props.$isActive ? '#28a745' : '#ddd'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$isActive ? '#28a745' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  flex: 1;
  min-width: fit-content;

  &:hover {
    border-color: #28a745;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BVIResetButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;