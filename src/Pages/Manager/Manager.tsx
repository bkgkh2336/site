import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LoginForm, Input, ErrorMessage } from './styled';
import H1 from '../../Components/H1/H1';
import Button from '../../Components/Button/Button';
import Block from '../../Components/Block/Block';
import ContactsManager from './ContactsManager';

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
    { key: 'contacts' as SectionType, label: 'Контакты' },
    { key: 'services' as SectionType, label: 'Услуги' },
    { key: 'documents' as SectionType, label: 'Документы' },
    { key: 'news' as SectionType, label: 'Новости' },
  ], []);

  const renderSectionContent = useMemo(() => {
    switch (activeSection) {
      case 'contacts':
        return <ContactsManager />;
      case 'services':
        return <p>Редактирование услуг</p>;
      case 'documents':
        return <p>Редактирование документов</p>;
      case 'news':
        return <p>Редактирование новостей</p>;
      default:
        return <p>Выберите раздел для редактирования</p>;
    }
  }, [activeSection]);

  if (!isAuthorized) {
    return (
      <div>
        <H1>Вход в панель управления</H1>
        <LoginForm onSubmit={handleLogin}>
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
          />
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          <Button style={{ opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </LoginForm>
      </div>
    );
  }

  return (
    <div>
      <H1>Панель управления</H1>
      
      <Block style={{ gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {sections.map((section) => (
          <Button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            style={{
              backgroundColor: activeSection === section.key ? '#28a745' : '#6c757d',
            }}
            aria-pressed={activeSection === section.key}
          >
            {section.label}
          </Button>
        ))}
      </Block>

      <Block>
        {renderSectionContent}
      </Block>

      <Button onClick={handleLogout} style={{ marginTop: '20px' }}>Выйти</Button>
    </div>
  );
};

export default Manager;