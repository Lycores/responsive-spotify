import './App.css';
import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'
import HomePage from './page/HomePage';
import AlbumPage from './page/AlbumPage';
import WelcomePage from './page/WelcomePage'
import ArtistsPage from './page/ArtistsPage'
import PlaylistPage from './page/PlaylistPage'
import TraditionalMusicPlayerPage from './page/TraditionalMusicPlayerPage'
import { userProfileRecoil} from './recoilInfo'
import {useRecoilState} from 'recoil'
import RouteProtector from './components/RouteProtector'
function App() {

  var [token, setToken] = useState(null);
  var [userProfileState, setUserProfileState] = useRecoilState(userProfileRecoil)
  // var [deviceId, setDeviceId] = useState(null)

  async function getToken() {
    fetch('/auth/token').then((response)=>{
      return response.json()
    }).then((json)=>{
      setToken(json.access_token)
    })
  }

  async function getUserProfile() {
    fetch('/user/getUserProfile')
    .then((response)=>{
      return response.json()
    }).then((json)=>{
      setUserProfileState(json)
    })
  }

  useEffect(() => {

    if(!token){
      getToken();
    }
    if(!userProfileState){
      getUserProfile()
    }
  }, [])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}/>
        <Route element={<RouteProtector token={token}/>}>
          <Route path="/traditional" element={<TraditionalMusicPlayerPage token={token} />}>
            <Route exact path="album" element={<AlbumPage token={token} />}/>
            <Route exact path="artists" element={<ArtistsPage token={token} /> }/>
            <Route exact path="playlist" element={<PlaylistPage token={token} /> }/>
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
