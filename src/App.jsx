import './App.css';

import { Routes, Route } from "react-router-dom";
import AppRouter from './Routes/AppRouter';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <AppRouter/>
     </BrowserRouter>
    </div>
  );
}

export default App;
