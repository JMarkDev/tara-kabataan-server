import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/User/Home'
import Register from './pages/Login/Register'
import Login from './pages/Login/Login' 
import PageNotFound from './pages/Pagenotfound'
import LayoutUser from './components/LayoutUser'
import Events from './pages/User/Events'
import About from './pages/User/About'
import ContactUs from './pages/User/ContactUs'

import LayoutAdmin from './components/LayoutAdmin'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import VerifyOTP from './components/VeriryOTP/VerifyOTP'

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={
        <LayoutUser>
          <Home />
        </LayoutUser>
      } />
      <Route path='/register' element={
        <LayoutUser>
          <Register />
        </LayoutUser>
      }/>

      <Route path='/login' element={
        <LayoutUser>
          <Login />
        </LayoutUser>
      }/>

      <Route path='/verify-otp' element={
        <LayoutUser>
          <VerifyOTP />
        </LayoutUser>
      }/>


      <Route path='/home' element={
        <LayoutUser>
          <Home />
        </LayoutUser>
      }/>
      <Route path='/events' element={
        <LayoutUser>
          <Events />
        </LayoutUser>
      }/>
      <Route path='/about' element={
        <LayoutUser>
          <About />
        </LayoutUser>
      }/>
      <Route path='/contact-us' element={
        <LayoutUser>
          <ContactUs />
        </LayoutUser>
      }/>

      <Route path='/dashboard' element={
        <LayoutAdmin>
          <Dashboard />
        </LayoutAdmin>
      }/>

      <Route path='/*' element={<PageNotFound />}/>
     </Routes>
    </>
  )
}

export default App
