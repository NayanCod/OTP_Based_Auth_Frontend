import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth';
import Home from './pages/home';
import NotFound from './pages/notFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      console.log('Token found:', token);
    } else {
      setIsAuthenticated(false);
      console.log('No token found, redirecting to auth page.');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
