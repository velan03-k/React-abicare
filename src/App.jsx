import './App.css';

import {BrowserRouter} from 'react-router-dom';
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
