import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Chatbot } from './pages/Chatbot';
import { Navbar } from './components/Navbar';
import { Goals } from './pages/Goals';
import { Survey } from './pages/Survey';

function App() {
  return (
    <>
      <div className="App"> 
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/chatbot" element={<Chatbot/>}/>
            <Route path="/survey" element={<Survey/>}/>
            <Route path="/goals" element={<Goals/>}/>
          </Routes>
        </Router>
      </div>
  
    </>
  );
}

export default App;