import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Базовый URL сайта
export const BASE_URL = 'https://bkgkh.by';

// Определяем все страницы сайта
export const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about_us', priority: '0.8', changefreq: 'monthly' },
  { url: '/requisites', priority: '0.6', changefreq: 'monthly' },
  { url: '/work_schedule', priority: '0.7', changefreq: 'monthly' },
  { url: '/contacts', priority: '0.9', changefreq: 'monthly' },
  { url: '/documents', priority: '0.8', changefreq: 'weekly' },
  
  // Услуги
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/ventilation_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/waste_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/electro_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/grass_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/heating_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/plumbing_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/el_inst_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/transport_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/transport_jur_services', priority: '0.8', changefreq: 'monthly' },
  { url: '/transport_other_services', priority: '0.8', changefreq: 'monthly' },
  
  // Для граждан
  { url: '/schedule_forms', priority: '0.8', changefreq: 'weekly' },
  { url: '/service_115', priority: '0.9', changefreq: 'monthly' },
  { url: '/payment', priority: '0.9', changefreq: 'monthly' },
  { url: '/appeals', priority: '0.8', changefreq: 'monthly' },
  { url: '/administrative_procedures', priority: '0.7', changefreq: 'monthly' },
  { url: '/sale_and_lease', priority: '0.7', changefreq: 'weekly' },
  { url: '/tariffs', priority: '0.9', changefreq: 'monthly' },
  { url: '/blank_bmp', priority: '0.6', changefreq: 'monthly' },
  { url: '/plans_and_schedules', priority: '0.7', changefreq: 'monthly' },
  { url: '/non_cash_housing_subsidies', priority: '0.7', changefreq: 'monthly' },
  { url: '/information_about_communal', priority: '0.7', changefreq: 'monthly' },
  { url: '/assistance_disabilities', priority: '0.7', changefreq: 'monthly' },
  { url: '/surveys', priority: '0.6', changefreq: 'monthly' },
  { url: '/cybersecurity', priority: '0.7', changefreq: 'monthly' },
  
  // Новости
  { url: '/news', priority: '0.8', changefreq: 'weekly' },
  { url: '/news/union_conference', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/cleanup_day', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/unified_safety_day', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/safety_day_passed', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/unified_information_day', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/dai_lesu_novae_zyccio', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/articles', priority: '0.7', changefreq: 'weekly' },
  { url: '/news/articles/boiler_maintenance', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/articles/boiler_low_temperature', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/articles/attractions_safety', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/articles/autonomous_fire_detectors', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know', priority: '0.7', changefreq: 'weekly' },
  { url: '/news/useful_to_know/gsz_portal', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/phone_scammers_guide', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/phishing', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/vishing', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/phone_scammers', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/safe_internet_cards', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/pomogut_by', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/boiler_safety', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/composting_guide', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/waste_containers_guide', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/waste_removal_guide', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/yard_recycling_guide', priority: '0.6', changefreq: 'monthly' },
  { url: '/news/useful_to_know/landscaping_guide', priority: '0.6', changefreq: 'monthly' },
];

// Генерируем XML sitemap
export const generateSitemap = (
  items = pages,
  baseUrl = BASE_URL,
  lastmod = new Date().toISOString().split('T')[0],
) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  items.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
};

// Сохраняем sitemap в public папку (только при запуске файла напрямую)
const main = () => {
  const sitemap = generateSitemap();
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  fs.writeFileSync(publicPath, sitemap, 'utf8');
  console.log('✅ Sitemap успешно создан:', publicPath);
  console.log(`📄 Всего страниц: ${pages.length}`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
