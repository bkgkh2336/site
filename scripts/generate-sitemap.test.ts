import { describe, it, expect } from 'vitest';
import { generateSitemap, pages, BASE_URL } from './generate-sitemap.js';

describe('generateSitemap', () => {
  it('формирует корректный XML-документ', () => {
    const xml = generateSitemap(
      [{ url: '/x', priority: '0.5', changefreq: 'monthly' }],
      'https://example.com',
      '2026-01-01',
    );

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://example.com/x</loc>');
    expect(xml).toContain('<lastmod>2026-01-01</lastmod>');
    expect(xml).toContain('<changefreq>monthly</changefreq>');
    expect(xml).toContain('<priority>0.5</priority>');
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
  });

  it('включает все объявленные маршруты', () => {
    const xml = generateSitemap();
    for (const page of pages) {
      expect(xml).toContain(`<loc>${BASE_URL}${page.url}</loc>`);
    }
  });

  it('содержит ключевые разделы', () => {
    const xml = generateSitemap();
    expect(xml).toContain(`<loc>${BASE_URL}/</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/news</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/contacts</loc>`);
  });

  it('число <url> совпадает с числом страниц', () => {
    const xml = generateSitemap();
    const count = (xml.match(/<url>/g) || []).length;
    expect(count).toBe(pages.length);
  });
});
