import { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const navigate=useNavigate();

  useEffect(()=>{
      const token=localStorage.getItem('token');
      if(!token){
        navigate('/login');
      }
  },[])

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login/>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
