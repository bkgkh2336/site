import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Users, Wrench, FileText, Newspaper, LogIn, LogOut, Lock, User } from 'lucide-react';
import {
  LoginPage, LoginCard, LoginLogo, LoginTitle, LoginSubtitle,
  LoginForm, InputWrap, Input, ErrorMessage,
  Shell, Toolbar, ToolbarTitle, UserArea, UserBadge, TabNav, TabButton
} from './styled';
import { Card, ActionButton } from './ui';
import ContactsManager from './ContactsManager';
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
        const response = await fetch('/backend/api.php/api/verify', {
          credentials: 'include' // Отправляем куки
        });
        if (response.ok) {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Session check error:', err);
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
      const response = await fetch('/backend/api.php/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include' // Получаем httpOnly куку
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthorized(true);
        setPassword('');
      } else {
        setError(data.message || 'Неверный пароль');
      }
    } catch (err) {
      setError('Ошибка при подключении к серверу');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [password]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/backend/api.php/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
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
        return <Card><p>Редактирование услуг</p></Card>;
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
