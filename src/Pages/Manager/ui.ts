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

const iconControlStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const IconButton = styled.button<{ $tone?: 'green' | 'red' | 'gray' }>`
  ${iconControlStyles};
  background: ${({ $tone }) => ($tone === 'red' ? '#dc3545' : $tone === 'gray' ? '#f1f3f5' : '#28a745')};
  color: ${({ $tone }) => ($tone === 'gray' ? '#495057' : '#ffffff')};

  &:hover {
    background: ${({ $tone }) => ($tone === 'red' ? '#c82333' : $tone === 'gray' ? '#e9ecef' : '#218838')};
    color: ${({ $tone }) => ($tone === 'gray' ? '#212529' : '#ffffff')};
    transform: scale(1.05);
  }
`;

export const IconLink = styled.a<{ $tone?: 'green' | 'red' | 'gray' }>`
  ${iconControlStyles};
  background: ${({ $tone }) => ($tone === 'red' ? '#dc3545' : $tone === 'gray' ? '#f1f3f5' : '#28a745')};
  color: ${({ $tone }) => ($tone === 'gray' ? '#495057' : '#ffffff')};

  &:hover {
    background: ${({ $tone }) => ($tone === 'red' ? '#c82333' : $tone === 'gray' ? '#e9ecef' : '#218838')};
    color: ${({ $tone }) => ($tone === 'gray' ? '#212529' : '#ffffff')};
    transform: scale(1.05);
  }
`;

export const ModalOverlay = styled.div<{ $fullscreen?: boolean }>`
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
  padding: ${({ $fullscreen }) => ($fullscreen ? '0' : '20px')};
`;

export const ModalContent = styled.div<{ $wide?: boolean; $fullscreen?: boolean }>`
  background: white;
  border-radius: ${({ $fullscreen }) => ($fullscreen ? '0' : '16px')};
  max-width: ${({ $fullscreen, $wide }) => ($fullscreen ? 'none' : $wide ? '960px' : '600px')};
  width: 100%;
  max-height: ${({ $fullscreen }) => ($fullscreen ? 'none' : '90vh')};
  ${({ $fullscreen }) => $fullscreen && 'height: 100%;'}
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $fullscreen }) =>
      $fullscreen ? 'none' : '0 20px 40px rgba(16, 24, 40, 0.25)'};
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
  flex-wrap: wrap;
  position: sticky;
  bottom: 0;
  z-index: 1;
  margin: 20px -24px -24px;
  padding: 14px 24px;
  background: #fff;
  border-top: 1px solid #eef1f4;
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

// --- Вид «доска»: панель категорий + карточки документов ---

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const BoardView = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CategoryPanel = styled.aside`
  width: 270px;
  flex-shrink: 0;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: sticky;
  top: 16px;

  @media (max-width: 900px) {
    width: 100%;
    position: static;
  }
`;

export const CategoryPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px 10px;
  border-bottom: 2px solid #e7f3e9;
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 16px;
  color: #198754;
`;

export const CategoryItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'rgba(40, 167, 69, 0.1)')};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#28a745' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#495057')};
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  text-align: left;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(40, 167, 69, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.04)')};
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#218838' : '#e7f3e9')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#0c3e14')};
    border-color: ${({ $active }) => ($active ? 'transparent' : '#28a745')};
  }

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
`;

export const CategoryName = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CategoryCount = styled.span<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.2)' : '#e7f3e9')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#28a745')};
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

export const CategoryEdit = styled.span<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  flex-shrink: 0;
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.2)' : '#f1f3f5')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#6c757d')};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #ffffff;
    color: #198754;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const BoardMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DocCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: #28a745;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.12);
  }

  @media (max-width: 560px) {
    flex-wrap: wrap;
  }
`;

export const DocCardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #e7f3e9;
  color: #28a745;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const DocCardInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const DocCardName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #212529;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DocCardMeta = styled.div`
  font-size: 13px;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DocCardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 560px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const EmptyPanel = styled.p`
  margin: 8px 0;
  padding: 24px 16px;
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  background: #ffffff;
  border: 1px dashed #dee2e6;
  border-radius: 12px;
`;

export const AvatarImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #e9ecef;
`;
