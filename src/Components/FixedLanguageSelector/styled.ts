import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

export const SelectorButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${props => props.$isOpen ? 'rgba(40, 167, 69, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  border: 2px solid ${props => props.$isOpen ? '#28a745' : 'rgba(40, 167, 69, 0.3)'};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(40, 167, 69, 0.95);
    border-color: #28a745;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    
    span {
      color: white;
    }
  }

  .chevron-icon {
    width: 16px;
    height: 16px;
    color: ${props => props.$isOpen ? 'white' : '#28a745'};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 6px;
  }
`;

export const FlagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const LanguageCode = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  transition: color 0.3s ease;

  ${SelectorButton}:hover & {
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  min-width: 160px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    min-width: 140px;
  }
`;

export const LanguageOption = styled.a<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.$isActive ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
  color: inherit;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(40, 167, 69, 0.15);
  }

  ${LanguageCode} {
    color: ${props => props.$isActive ? '#28a745' : '#333'};
    font-weight: ${props => props.$isActive ? '700' : '600'};
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    gap: 8px;
  }
`;