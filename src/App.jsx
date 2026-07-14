import './App.css';

import {BrowserRouter} from 'react-router-dom';
import AppRouter from './Routes/AppRouter';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
// import AuthLayout from './Components/AuthLayout';
import { useLocation } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const authPages = [
    "/login",
    "/signup",
    "/forgotpassword",
  ];

  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <AppRouter />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;