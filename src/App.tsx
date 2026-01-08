import './App.css'
import Header from './Components/Header/Header'
import Main from './Pages/Main/Main'
import Contacts from './Pages/Contacts/Contacts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import FixedLanguageSelector from './Components/FixedLanguageSelector/FixedLanguageSelector'
import Vacancies from './Pages/Vacancies/Vacancies'
import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import About_us from './Pages/About_us/About_us'
import Documents from './Pages/Documents/Documents'
import Services from './Pages/Services/Services'
import Ventilation_services from './Pages/Services/Ventilation_services/Ventilation_services'
import Waste_services from './Pages/Services/Waste_services/Waste_services'
import Electro_services from './Pages/Services/Electro_services/Electro_services'
import Grass_services from './Pages/Services/Grass_services/Grass_services'
import Heating_services from './Pages/Services/Heating_services/Heating_services'
import Plumbing_services from './Pages/Services/Plumbing_services/Plumbing_services'
import El_inst_services from './Pages/Services/El_inst_services/El_inst_services'
import Transport_services from './Pages/Services/Transport_services/Transport_services'
import Transport_jur_services from './Pages/Services/Transport_jur_services/Transport_jur_services'
import Transport_other_services from './Pages/Services/Transport_other_services/Transport_other_services'
import ScheduleForms from './Pages/ScheduleForms/ScheduleForms'
import Service115 from './Pages/Service115/Service115'
import Payment from './Pages/Payment/Payment'
import Appeals from './Pages/ForCitizens/Appeals/Appeals'
import AdministrativeProcedures from './Pages/ForCitizens/AdministrativeProcedures/AdministrativeProcedures'
import SaleAndLease from './Pages/ForCitizens/SaleAndLease/SaleAndLease'
import Tariffs from './Pages/ForCitizens/Tariffs/Tariffs'
import BlankBmp from './Pages/ForCitizens/BlankBmp/BlankBmp'
import PlansAndSchedules from './Pages/ForCitizens/PlansAndSchedules/PlansAndSchedules'
import NonCashHousingSubsidies from './Pages/ForCitizens/NonCashHousingSubsidies/NonCashHousingSubsidies'
import InformationAboutCommunal from './Pages/ForCitizens/InformationAboutCommunal/InformationAboutCommunal'
import AssistanceDisabilities from './Pages/ForCitizens/AssistanceDisabilities/AssistanceDisabilities'
import Surveys from './Pages/ForCitizens/Surveys/Surveys'
import Cybersecurity from './Pages/ForCitizens/Cybersecurity/Cybersecurity'
import UsefulToKnow from './Pages/News/UsefulToKnow/UsefulToKnow'
import PhoneScammers from './Pages/News/UsefulToKnow/PhoneScammers/PhoneScammers'
import SafeInternetCards from './Pages/News/UsefulToKnow/SafeInternetCards/SafeInternetCards'
import PomogutBy from './Pages/News/UsefulToKnow/PomogutBy/PomogutBy'
import BoilerSafety from './Pages/News/UsefulToKnow/BoilerSafety/BoilerSafety'
import CompostingGuide from './Pages/News/UsefulToKnow/CompostingGuide/CompostingGuide'
import WasteContainersGuide from './Pages/News/UsefulToKnow/WasteContainersGuide/WasteContainersGuide'
import WasteRemovalGuide from './Pages/News/UsefulToKnow/WasteRemovalGuide/WasteRemovalGuide'
import YardRecyclingGuide from './Pages/News/UsefulToKnow/YardRecyclingGuide/YardRecyclingGuide'
import LandscapingGuide from './Pages/News/UsefulToKnow/LandscapingGuide/LandscapingGuide'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import NotFound from './Pages/NotFound/NotFound'

const routeTitles: Record<string, string> = {
  '/': 'Главная - КЖУП "Буда-Кошелёвский коммунальник"',
  '/about_us': 'О нас - КЖУП "Буда-Кошелёвский коммунальник"',
  '/contacts': 'Контакты - КЖУП "Буда-Кошелёвский коммунальник"',
  '/vacancies': 'Вакансии - КЖУП "Буда-Кошелёвский коммунальник"',
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
};

function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'КЖУП "Буда-Кошелёвский коммунальник"';
    document.title = title;
  }, [location]);

  return null;
}


function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (ref.current) {
        setHeaderHeight(ref.current.offsetHeight+20);
      }
    };
    
    // Fix for iOS Safari viewport height issue
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    updateHeaderHeight();
    
    window.addEventListener('resize', () => {
      setVh();
      updateHeaderHeight();
    });
    
    // Also update on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        setVh();
        updateHeaderHeight();
      }, 100);
    });
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('orientationchange', updateHeaderHeight);
    };
  }, []);

  return (
    <Router>
      <PageTitleUpdater />
      <ScrollToTop />
      <FixedLanguageSelector />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: '-webkit-fill-available'
      }}>
        <Header ref={ref} />
        <div style={{ overflow: 'auto', justifyContent: 'space-between', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: headerHeight }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/about_us' element={<About_us />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/vacancies" element={<Vacancies />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
