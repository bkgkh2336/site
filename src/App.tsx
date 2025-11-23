import './App.css'
import Header from './Components/Header/Header'
import Main from './Pages/Main/Main'
import Contacts from './Pages/Contacts/Contacts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
        <Header />
        <div style={{overflow: 'auto'}}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
          <div>
            footer
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
