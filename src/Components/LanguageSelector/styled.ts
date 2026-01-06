import styled from 'styled-components';

export const LanguageSelectorContainer = styled.div<{ $isMobile: boolean }>`
  position: relative;
  display: ${props => props.$isMobile ? 'block' : 'inline-block'};
  width: ${props => props.$isMobile ? '100%' : 'auto'};
`;

export const LanguageButton = styled.button<{ $isOpen: boolean; $isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$isMobile ? '12px' : '8px'};
  padding: ${props => props.$isMobile ? '12px' : '8px 12px'};
  background: ${props => props.$isOpen ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.$isOpen ? '#28a745' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.$isMobile ? '100%' : 'auto'};
  font-size: ${props => props.$isMobile ? '16px' : '14px'};
  
  &:hover {
    background: rgba(40, 167, 69, 0.1);
    border-color: #28a745;
  }

  .chevron-icon {
    width: ${props => props.$isMobile ? '18px' : '16px'};
    height: ${props => props.$isMobile ? '18px' : '16px'};
    color: #666;
    margin-left: auto;
  }
`;

export const CurrentLanguage = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #333;

  .flag-indicator {
    width: ${props => props.$isMobile ? '20px' : '16px'};
    height: ${props => props.$isMobile ? '20px' : '16px'};
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .code {
    font-size: ${props => props.$isMobile ? '15px' : '14px'};
    color: #333;
    font-weight: 600;
  }
`;

export const LanguageDropdown = styled.div<{ $isOpen: boolean; $isMobile: boolean }>`
  position: ${props => props.$isMobile ? 'static' : 'absolute'};
  top: ${props => props.$isMobile ? 'auto' : 'calc(100% + 8px)'};
  right: 0;
  min-width: ${props => props.$isMobile ? '100%' : '200px'};
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: ${props => props.$isMobile ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  margin-top: ${props => props.$isMobile && props.$isOpen ? '8px' : '0'};
`;

export const LanguageOption = styled.a<{ $isActive: boolean; $isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: ${props => props.$isMobile ? '12px' : '10px 12px'};
  background: ${props => props.$isActive ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
  font-size: ${props => props.$isMobile ? '15px' : '14px'};
  text-decoration: none;
  color: inherit;
  justify-content: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(40, 167, 69, 0.1);
  }

  .flag-indicator {
    width: ${props => props.$isMobile ? '22px' : '18px'};
    height: ${props => props.$isMobile ? '22px' : '18px'};
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .code {
    font-size: ${props => props.$isMobile ? '15px' : '14px'};
    color: ${props => props.$isActive ? '#28a745' : '#333'};
    font-weight: ${props => props.$isActive ? '600' : '500'};
  }
`;