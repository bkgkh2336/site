import fs from 'fs';
import path from 'path';

// Базовый URL сайта
const BASE_URL = 'https://bkgkh.by';

// Определяем все страницы сайта
const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about_us', priority: '0.8', changefreq: 'monthly' },
  { url: '/requisites', priority: '0.6', changefreq: 'monthly' },
  { url: '/work_schedule', priority: '0.7', changefreq: 'monthly' },
  { url: '/contacts', priority: '0.9', changefreq: 'monthly' },
  { url: '/vacancies', priority: '0.7', changefreq: 'weekly' },
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
  { url: '/news/useful_to_know', priority: '0.7', changefreq: 'weekly' },
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

// Получаем текущую дату
const currentDate = new Date().toISOString().split('T')[0];

// Генерируем XML sitemap
const generateSitemap = () => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
};

// Сохраняем sitemap в public папку
const sitemap = generateSitemap();
const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');

fs.writeFileSync(publicPath, sitemap, 'utf8');
console.log('✅ Sitemap успешно создан:', publicPath);
console.log(`📄 Всего страниц: ${pages.length}`);