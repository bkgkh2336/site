import styled from "styled-components";

export const LoginPage = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* Один шрифт для всего на странице, включая input/button/select */
  *, *::before, *::after {
    font-family: inherit;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  min-height: 60vh;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 12px 32px rgba(16, 24, 40, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const LoginLogo = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-bottom: 8px;
`;

export const LoginTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #212529;
  text-align: center;
`;

export const LoginSubtitle = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  color: #6c757d;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 14px;
    width: 18px;
    height: 18px;
    color: #adb5bd;
    pointer-events: none;
  }

  input {
    padding-left: 42px;
  }
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.15);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  margin: 0;
  font-size: 14px;
  text-align: center;
`;

// --- Оболочка панели управления ---

export const Shell = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* Один шрифт для всего в панели, включая input/button/select */
  *, *::before, *::after {
    font-family: inherit;
  }
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ToolbarTitle = styled.h1`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 26px;
    height: 26px;
    color: #28a745;
  }
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: #f1f3f5;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: #495057;

  svg {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

export const TabNav = styled.nav`
  display: flex;
  gap: 6px;
  padding: 6px;
  background: #f1f3f5;
  border-radius: 14px;
  overflow-x: auto;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#198754' : '#6c757d')};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(16, 24, 40, 0.1)' : 'none')};

  &:hover {
    color: ${({ $active }) => ($active ? '#198754' : '#212529')};
  }

  svg {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 560px) {
    flex: 1;
    justify-content: center;
    padding: 10px 12px;
    font-size: 14px;
  }
`;
