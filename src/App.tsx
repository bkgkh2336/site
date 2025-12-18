import './App.css'
import Header from './Components/Header/Header'
import Main from './Pages/Main/Main'
import Contacts from './Pages/Contacts/Contacts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Vacancies from './Pages/Vacancies/Vacancies'
import { useRef } from 'react'
import About_us from './Pages/About_us/About_us'
import Documents from './Pages/Documents/Documents'


function App() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header ref={ref} />
        <div style={{ overflow: 'auto', justifyContent: 'space-between', height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/about_us' element={<About_us />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path='/documents' element={<Documents />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
