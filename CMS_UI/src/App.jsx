// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './component/LoginPage'
import DashBoard from './component/DashBoard'

// export const baseUrl ="/cmsui";

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
