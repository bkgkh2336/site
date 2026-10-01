import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Users, Wrench, FileText, Newspaper, LogIn, LogOut, Lock, User } from 'lucide-react';
import {
  LoginPage, LoginCard, LoginLogo, LoginTitle, LoginSubtitle,
  LoginForm, InputWrap, Input, ErrorMessage,
  Shell, Toolbar, ToolbarTitle, UserArea, UserBadge, TabNav, TabButton
} from './styled';
import { Card, ActionButton } from './ui';
import { apiGet, apiPost, ApiError } from './api';
import ContactsManager from './ContactsManager';
import ServicesManager from './ServicesManager';
import DocumentsManager from './DocumentsManager';
import NewsManager from './NewsManager';

type SectionType = 'contacts' | 'services' | 'documents' | 'news';

const Manager: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('contacts');

  // Проверка существующей сессии при монтировании
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await apiGet<{ success?: boolean }>('verify', { redirectOn401: false });
        if (data?.success) {
          setIsAuthorized(true);
        }
      } catch (err) {
        // 401 — просто нет активной сессии
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error('Session check error:', err);
        }
      }
    };
    checkSession();
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await apiPost<{ success?: boolean; message?: string }>(
        'login',
        { password },
        { redirectOn401: false }
      );

      if (data?.success) {
        setIsAuthorized(true);
        setPassword('');
      } else {
        setError(data?.message || 'Неверный пароль');
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError(err.message || 'Неверный пароль');
      } else {
        setError('Ошибка при подключении к серверу');
        console.error('Login error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [password]);

  const handleLogout = useCallback(async () => {
    try {
      await apiPost('logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthorized(false);
    setPassword('');
    setError('');
    setActiveSection('contacts');
  }, []);

  const sections = useMemo(() => [
    { key: 'contacts' as SectionType, label: 'Контакты', icon: <Users /> },
    { key: 'services' as SectionType, label: 'Услуги', icon: <Wrench /> },
    { key: 'documents' as SectionType, label: 'Документы', icon: <FileText /> },
    { key: 'news' as SectionType, label: 'Новости', icon: <Newspaper /> },
  ], []);

  const renderSectionContent = useMemo(() => {
    switch (activeSection) {
      case 'contacts':
        return <ContactsManager />;
      case 'services':
        return <ServicesManager />;
      case 'documents':
        return <DocumentsManager />;
      case 'news':
        return <NewsManager />;
      default:
        return <Card><p>Выберите раздел для редактирования</p></Card>;
    }
  }, [activeSection]);

  if (!isAuthorized) {
    return (
      <LoginPage>
        <LoginCard>
          <LoginLogo src="/logo.png" alt="Логотип" />
          <LoginTitle>Панель управления</LoginTitle>
          <LoginSubtitle>КЖУП «Буда-Кошелёвский коммунальник»</LoginSubtitle>
          <LoginForm onSubmit={handleLogin}>
            <InputWrap>
              <Lock aria-hidden="true" />
              <Input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                aria-label="Пароль"
              />
            </InputWrap>
            {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
            <ActionButton type="submit" disabled={isLoading}>
              <LogIn />
              {isLoading ? 'Загрузка...' : 'Войти'}
            </ActionButton>
          </LoginForm>
        </LoginCard>
      </LoginPage>
    );
  }

  return (
    <Shell>
      <Toolbar>
        <ToolbarTitle>
          <User aria-hidden="true" />
          Панель управления
        </ToolbarTitle>
        <UserArea>
          <UserBadge>
            <User />
            admin
          </UserBadge>
          <ActionButton $variant="danger" onClick={handleLogout}>
            <LogOut />
            Выйти
          </ActionButton>
        </UserArea>
      </Toolbar>

      <TabNav role="tablist" aria-label="Разделы панели управления">
        {sections.map((section) => (
          <TabButton
            key={section.key}
            role="tab"
            aria-selected={activeSection === section.key}
            $active={activeSection === section.key}
            onClick={() => setActiveSection(section.key)}
          >
            {section.icon}
            {section.label}
          </TabButton>
        ))}
      </TabNav>

      {renderSectionContent}
    </Shell>
  );
};

export default Manager;
