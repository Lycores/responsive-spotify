import './App.css';
import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import HomePage from './page/HomePage';
import PlaylistPage from './page/PlaylistPage';
import WelcomePage from './page/WelcomePage'

function App() {

  var [token, setToken] = useState('');
  async function getToken() {
    const response = await fetch('/auth/token');
    const json = await response.json();
    setToken(json.access_token);
  }

  useEffect(() => {
    if(token === ''){
      getToken();
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/playlist" element={<PlaylistPage token={token}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
