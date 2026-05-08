import './App.css'
import { lazy, Suspense, useRef, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import FixedLanguageSelector from './Components/FixedLanguageSelector/FixedLanguageSelector'
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import LoadingIndicator from './Components/LoadingIndicator/LoadingIndicator'
import Loading from './Components/Loading/Loading'
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs'
import SEO from './Components/SEO/SEO'
import StructuredData from './Components/StructuredData/StructuredData'
import { seoConfigs } from './utils/seoConfig'
import AccessibilityPanel from './Components/AccessibilityPanel/AccessibilityPanel'

// Pages — code splitting via lazy loading
const Main = lazy(() => import('./Pages/Main/Main'))
const Contacts = lazy(() => import('./Pages/Contacts/Contacts'))
const About_us = lazy(() => import('./Pages/About_us/About_us'))
const Documents = lazy(() => import('./Pages/Documents/Documents'))
const Services = lazy(() => import('./Pages/Services/Services'))
const Ventilation_services = lazy(() => import('./Pages/Services/Ventilation_services/Ventilation_services'))
const Waste_services = lazy(() => import('./Pages/Services/Waste_services/Waste_services'))
const Electro_services = lazy(() => import('./Pages/Services/Electro_services/Electro_services'))
const Grass_services = lazy(() => import('./Pages/Services/Grass_services/Grass_services'))
const Heating_services = lazy(() => import('./Pages/Services/Heating_services/Heating_services'))
const Plumbing_services = lazy(() => import('./Pages/Services/Plumbing_services/Plumbing_services'))
const El_inst_services = lazy(() => import('./Pages/Services/El_inst_services/El_inst_services'))
const Transport_services = lazy(() => import('./Pages/Services/Transport_services/Transport_services'))
const Transport_jur_services = lazy(() => import('./Pages/Services/Transport_jur_services/Transport_jur_services'))
const Transport_other_services = lazy(() => import('./Pages/Services/Transport_other_services/Transport_other_services'))
const ScheduleForms = lazy(() => import('./Pages/ScheduleForms/ScheduleForms'))
const Service115 = lazy(() => import('./Pages/Service115/Service115'))
const Payment = lazy(() => import('./Pages/Payment/Payment'))
const Appeals = lazy(() => import('./Pages/ForCitizens/Appeals/Appeals'))
const AdministrativeProcedures = lazy(() => import('./Pages/ForCitizens/AdministrativeProcedures/AdministrativeProcedures'))
const SaleAndLease = lazy(() => import('./Pages/ForCitizens/SaleAndLease/SaleAndLease'))
const Tariffs = lazy(() => import('./Pages/ForCitizens/Tariffs/Tariffs'))
const BlankBmp = lazy(() => import('./Pages/ForCitizens/BlankBmp/BlankBmp'))
const PlansAndSchedules = lazy(() => import('./Pages/ForCitizens/PlansAndSchedules/PlansAndSchedules'))
const NonCashHousingSubsidies = lazy(() => import('./Pages/ForCitizens/NonCashHousingSubsidies/NonCashHousingSubsidies'))
const InformationAboutCommunal = lazy(() => import('./Pages/ForCitizens/InformationAboutCommunal/InformationAboutCommunal'))
const AssistanceDisabilities = lazy(() => import('./Pages/ForCitizens/AssistanceDisabilities/AssistanceDisabilities'))
const Surveys = lazy(() => import('./Pages/ForCitizens/Surveys/Surveys'))
const Cybersecurity = lazy(() => import('./Pages/ForCitizens/Cybersecurity/Cybersecurity'))
const News = lazy(() => import('./Pages/News/News'))
const Articles = lazy(() => import('./Pages/News/Articles/Articles'))
const BoilerMaintenance = lazy(() => import('./Pages/News/Articles/BoilerMaintenance/BoilerMaintenance'))
const UnionConference = lazy(() => import('./Pages/News/News/UnionConference/UnionConference'))
const UsefulToKnow = lazy(() => import('./Pages/News/UsefulToKnow/UsefulToKnow'))
const PhoneScammers = lazy(() => import('./Pages/News/UsefulToKnow/PhoneScammers/PhoneScammers'))
const SafeInternetCards = lazy(() => import('./Pages/News/UsefulToKnow/SafeInternetCards/SafeInternetCards'))
const PomogutBy = lazy(() => import('./Pages/News/UsefulToKnow/PomogutBy/PomogutBy'))
const BoilerSafety = lazy(() => import('./Pages/News/UsefulToKnow/BoilerSafety/BoilerSafety'))
const CompostingGuide = lazy(() => import('./Pages/News/UsefulToKnow/CompostingGuide/CompostingGuide'))
const WasteContainersGuide = lazy(() => import('./Pages/News/UsefulToKnow/WasteContainersGuide/WasteContainersGuide'))
const WasteRemovalGuide = lazy(() => import('./Pages/News/UsefulToKnow/WasteRemovalGuide/WasteRemovalGuide'))
const YardRecyclingGuide = lazy(() => import('./Pages/News/UsefulToKnow/YardRecyclingGuide/YardRecyclingGuide'))
const LandscapingGuide = lazy(() => import('./Pages/News/UsefulToKnow/LandscapingGuide/LandscapingGuide'))
const GSZPortal = lazy(() => import('./Pages/News/UsefulToKnow/GSZPortal/GSZPortal'))
const Requisites = lazy(() => import('./Pages/Requisites/Requisites'))
const WorkSchedule = lazy(() => import('./Pages/WorkSchedule/WorkSchedule'))
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'))
const Manager = lazy(() => import('./Pages/Manager/Manager'))

const routeTitles: Record<string, string> = {
  '/': 'Главная - КЖУП "Буда-Кошелёвский коммунальник"',
  '/about_us': 'О нас - КЖУП "Буда-Кошелёвский коммунальник"',
  '/requisites': 'Реквизиты - КЖУП "Буда-Кошелёвский коммунальник"',
  '/work_schedule': 'Режим работы - КЖУП "Буда-Кошелёвский коммунальник"',
  '/contacts': 'Контакты - КЖУП "Буда-Кошелёвский коммунальник"',
  '/documents': 'Документы - КЖУП "Буда-Кошелёвский коммунальник"',
  '/services': 'Услуги - КЖУП "Буда-Кошелёвский коммунальник"',
  '/ventilation_services': 'Услуги вентиляционных и дымовых каналов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/waste_services': 'Услуги по вывозу мусора - КЖУП "Буда-Кошелёвский коммунальник"',
  '/electro_services': 'Услуги по электрофизическим измерениям - КЖУП "Буда-Кошелёвский коммунальник"',
  '/grass_services': 'Услуги по скашиванию травы - КЖУП "Буда-Кошелёвский коммунальник"',
  '/heating_services': 'Услуги по отоплению населению - КЖУП "Буда-Кошелёвский коммунальник"',
  '/plumbing_services': 'Услуги по водопроводу и канализации населению - КЖУП "Буда-Кошелёвский коммунальник"',
  '/el_inst_services': 'Электромонтажные работы населению - КЖУП "Буда-Кошелёвский коммунальник"',
  '/transport_services': 'Транспорт для населения и бюджетных организаций - КЖУП "Буда-Кошелёвский коммунальник"',
  '/transport_jur_services': 'Транспорт для юр. лиц - КЖУП "Буда-Кошелёвский коммунальник"',
  '/transport_other_services': 'Прочие транспортные услуги - КЖУП "Буда-Кошелёвский коммунальник"',
  '/schedule_forms': 'График приёма - КЖУП "Буда-Кошелёвский коммунальник"',
  '/service_115': 'Служба 115 - КЖУП "Буда-Кошелёвский коммунальник"',
  '/payment': 'Платежи через систему ЕРИП - КЖУП "Буда-Кошелёвский коммунальник"',
  '/appeals': 'Обращения граждан и юр. лиц - КЖУП "Буда-Кошелёвский коммунальник"',
  '/administrative_procedures': 'Административные процедуры - КЖУП "Буда-Кошелёвский коммунальник"',
  '/sale_and_lease': 'Продажа и аренда - КЖУП "Буда-Кошелёвский коммунальник"',
  '/tariffs': 'Тарифы ЖКУ - КЖУП "Буда-Кошелёвский коммунальник"',
  '/blank_bmp': 'Заготовка BMP - КЖУП "Буда-Кошелёвский коммунальник"',
  '/plans_and_schedules': 'Планы и графики - КЖУП "Буда-Кошелёвский коммунальник"',
  '/non_cash_housing_subsidies': 'Безналичные жилищные субсидии - КЖУП "Буда-Кошелёвский коммунальник"',
  '/information_about_communal': 'Информация о сфере ЖКХ - КЖУП "Буда-Кошелёвский коммунальник"',
  '/assistance_disabilities': 'Помощь инвалидам - КЖУП "Буда-Кошелёвский коммунальник"',
  '/surveys': 'Опросы - КЖУП "Буда-Кошелёвский коммунальник"',
  '/cybersecurity': 'Кибербезопасность - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news': 'Новости - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/union_conference': 'Прошла отчетная профсоюзная конференция - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know': 'Полезно знать - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/phone_scammers': 'Телефонные мошенники - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/safe_internet_cards': 'Безопасность в сети и банковские карты - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/pomogut_by': 'Pomogut BY - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/boiler_safety': 'Памятка по безопасной эксплуатации котлов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/composting_guide': 'Памятка по компостированию отходов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/waste_containers_guide': 'Памятка для индивидуальных домов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/waste_removal_guide': 'Памятка по вывозу коммунальных отходов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/yard_recycling_guide': 'Памятка по раздельному сбору отходов - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/landscaping_guide': 'Памятка по благоустройству - КЖУП "Буда-Кошелёвский коммунальник"',
  '/news/useful_to_know/gsz_portal': 'Портал государственной службы занятости - КЖУП "Буда-Кошелёвский коммунальник"',
  '/manager': 'Панель управления - КЖУП "Буда-Кошелёвский коммунальник"',
  '*': 'Страница не найдена - КЖУП "Буда-Кошелёвский коммунальник"',
};

function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'КЖУП "Буда-Кошелёвский коммунальник"';
    document.title = title;
  }, [location]);

  const seoConfig = seoConfigs[location.pathname] || seoConfigs['/'];

  return <SEO {...seoConfig} />;
}

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (ref.current) {
        setHeaderHeight(ref.current.offsetHeight + 20);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <PageTitleUpdater />
      <StructuredData />
      <LoadingIndicator />
      <div style={{ display: 'flex', flexDirection: 'column', height: `${viewportHeight}px` }}>
        <Header ref={ref} />
        <FixedLanguageSelector />
        <ScrollToTopButton />
        <div style={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: headerHeight }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Breadcrumbs />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/about_us' element={<About_us />} />
                <Route path='/requisites' element={<Requisites />} />
                <Route path='/work_schedule' element={<WorkSchedule />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path='/documents' element={<Documents />} />
                <Route path='/services' element={<Services />} />
                <Route path='/ventilation_services' element={<Ventilation_services />} />
                <Route path='/waste_services' element={<Waste_services />} />
                <Route path='/electro_services' element={<Electro_services />} />
                <Route path='/grass_services' element={<Grass_services />} />
                <Route path='/heating_services' element={<Heating_services />} />
                <Route path='/plumbing_services' element={<Plumbing_services />} />
                <Route path='/el_inst_services' element={<El_inst_services />} />
                <Route path='/transport_services' element={<Transport_services />} />
                <Route path='/transport_jur_services' element={<Transport_jur_services />} />
                <Route path='/transport_other_services' element={<Transport_other_services />} />
                <Route path='/schedule_forms' element={<ScheduleForms />} />
                <Route path='/service_115' element={<Service115 />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/appeals' element={<Appeals />} />
                <Route path='/administrative_procedures' element={<AdministrativeProcedures />} />
                <Route path='/sale_and_lease' element={<SaleAndLease />} />
                <Route path='/tariffs' element={<Tariffs />} />
                <Route path='/blank_bmp' element={<BlankBmp />} />
                <Route path='/plans_and_schedules' element={<PlansAndSchedules />} />
                <Route path='/non_cash_housing_subsidies' element={<NonCashHousingSubsidies />} />
                <Route path='/information_about_communal' element={<InformationAboutCommunal />} />
                <Route path='/assistance_disabilities' element={<AssistanceDisabilities />} />
                <Route path='/surveys' element={<Surveys />} />
                <Route path='/cybersecurity' element={<Cybersecurity />} />
                <Route path='/news' element={<News />} />
                <Route path='/news/union_conference' element={<UnionConference />} />
                <Route path='/news/articles' element={<Articles />} />
                <Route path='/news/articles/boiler_maintenance' element={<BoilerMaintenance />} />
                <Route path='/news/useful_to_know' element={<UsefulToKnow />} />
                <Route path='/news/useful_to_know/phone_scammers' element={<PhoneScammers />} />
                <Route path='/news/useful_to_know/safe_internet_cards' element={<SafeInternetCards />} />
                <Route path='/news/useful_to_know/pomogut_by' element={<PomogutBy />} />
                <Route path='/news/useful_to_know/boiler_safety' element={<BoilerSafety />} />
                <Route path='/news/useful_to_know/composting_guide' element={<CompostingGuide />} />
                <Route path='/news/useful_to_know/waste_containers_guide' element={<WasteContainersGuide />} />
                <Route path='/news/useful_to_know/waste_removal_guide' element={<WasteRemovalGuide />} />
                <Route path='/news/useful_to_know/yard_recycling_guide' element={<YardRecyclingGuide />} />
                <Route path='/news/useful_to_know/landscaping_guide' element={<LandscapingGuide />} />
                <Route path='/news/useful_to_know/gsz_portal' element={<GSZPortal />} />
                <Route path='/manager' element={<Manager />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
