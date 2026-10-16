import { describe, it, expect } from 'vitest';
import { ResolveDepartmentImage, SortLeadership } from './functions';

describe('ResolveDepartmentImage', () => {
  it('возвращает пустую строку для пустого значения', () => {
    expect(ResolveDepartmentImage('')).toBe('');
    expect(ResolveDepartmentImage(undefined)).toBe('');
  });

  it('легаси-имя превращает в путь /departments/', () => {
    expect(ResolveDepartmentImage('reception.png')).toBe('/departments/reception.png');
  });

  it('абсолютный путь оставляет как есть', () => {
    expect(ResolveDepartmentImage('/uploads/a.png')).toBe('/uploads/a.png');
  });

  it('внешний URL оставляет как есть', () => {
    expect(ResolveDepartmentImage('https://cdn.example.com/a.png')).toBe(
      'https://cdn.example.com/a.png',
    );
    expect(ResolveDepartmentImage('http://cdn.example.com/a.png')).toBe(
      'http://cdn.example.com/a.png',
    );
  });
});

describe('SortLeadership', () => {
  it('сортирует по фиксированному порядку должностей', () => {
    const input = [
      { job_title: 'Заместитель директора' },
      { job_title: 'Начальник отдела' },
      { job_title: 'Директор' },
      { job_title: 'Первый заместитель директора - Главный инженер' },
    ];

    const sorted = SortLeadership(input).map((p) => p.job_title);

    expect(sorted).toEqual([
      'Директор',
      'Первый заместитель директора - Главный инженер',
      'Заместитель директора',
      'Начальник отдела',
    ]);
  });

  it('не мутирует входной массив', () => {
    const input = [{ job_title: 'Заместитель директора' }, { job_title: 'Директор' }];
    const snapshot = [...input];

    SortLeadership(input);

    expect(input).toEqual(snapshot);
    expect(input[0].job_title).toBe('Заместитель директора');
  });

  it('неизвестные должности уходят в конец', () => {
    const input = [{ job_title: 'Уборщик' }, { job_title: 'Директор' }];
    expect(SortLeadership(input)[0].job_title).toBe('Директор');
  });

  it('отсутствие должности не ломает сортировку', () => {
    const input = [{ job_title: undefined }, { job_title: 'Директор' }];
    expect(SortLeadership(input)[0].job_title).toBe('Директор');
  });
});
