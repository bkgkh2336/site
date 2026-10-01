import React from 'react';
import ViewToggle from '../../Components/ViewToggle/ViewToggle';
import {
  Card, SectionHeader, SectionTitle, ToolbarRow,
  BoardView, CategoryPanel, CategoryPanelHeader, CategoryItem, CategoryName, CategoryCount,
  BoardMain
} from './ui';

/** Toolbar с переключателем карточки/таблица — общий для всех панелей. */
export const BoardToolbar: React.FC<{
  view: 'cards' | 'table';
  onViewChange: (view: 'cards' | 'table') => void;
}> = ({ view, onViewChange }) => (
  <ToolbarRow>
    <ViewToggle view={view} onViewChange={onViewChange} />
  </ToolbarRow>
);

export interface CategoryEntry {
  key: string | number;
  icon: React.ReactNode;
  label: string;
  count: number;
  onSelect: () => void;
  /** Дополнительный элемент внутри пункта (например, кнопка переименования). */
  extra?: React.ReactNode;
}

export const CategoryList: React.FC<{
  items: CategoryEntry[];
  activeKey: string | number | null;
}> = ({ items, activeKey }) => (
  <>
    {items.map(item => {
      const active = activeKey === item.key;
      return (
        <CategoryItem key={item.key} $active={active} onClick={item.onSelect}>
          {item.icon}
          <CategoryName>{item.label}</CategoryName>
          <CategoryCount $active={active}>{item.count}</CategoryCount>
          {item.extra}
        </CategoryItem>
      );
    })}
  </>
);

/** Cards-view: панель категорий + основной список. */
export const BoardCards: React.FC<{
  panelHeader: React.ReactNode;
  panel?: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ panelHeader, panel, title, action, children }) => (
  <BoardView>
    <CategoryPanel>
      <CategoryPanelHeader>{panelHeader}</CategoryPanelHeader>
      {panel}
    </CategoryPanel>
    <BoardMain>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {action}
      </SectionHeader>
      {children}
    </BoardMain>
  </BoardView>
);

/** Карточка-секция для таблицы (table-view). */
export const SectionCard: React.FC<{
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, action, children }) => (
  <Card>
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      {action}
    </SectionHeader>
    {children}
  </Card>
);
