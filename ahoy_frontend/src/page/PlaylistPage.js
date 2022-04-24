import '../App.css';
import {useEffect, useState} from 'react';
import {rightAreaStyleForDesktopOrTablet, rightAreaStyleForMobile} from '../stylesheets/mainBodyStyle/rightAreaStyle/rightAreaStyleSheet'
import {useLocation} from 'react-router-dom'
import RightAreaComponentForCardpresent from '../components/RightAreaComponentForCardPresent'
import { DesktopOrTablet, Mobile} from '../MediaQuery';

function PlaylistPage(props) {
    var {token} = props

    var playlist = null
    var playlistList = []
    var {state} = useLocation()
    if(state){
      var playlist = state.playlist
    }


    const getMyPlaylist = () =>{
        fetch('/playlist/getMyPlaylists')
        .then((response)=>{
            return response.json()
        }).then((json)=>{
            setPlaylistListState(json.items)
        })
    }

    var [playlistListState, setPlaylistListState] = useState(playlistList)

    useEffect(() => { 
        if(!playlist){
            getMyPlaylist()
        }
    },[token])
  return (
    <>
      <DesktopOrTablet>
        <div style={rightAreaStyleForDesktopOrTablet} >
          {(!playlist) ? <RightAreaComponentForCardpresent itemList={playlistListState} type="playlist"/> :
            <></>}
        </div>
      </DesktopOrTablet>
      <Mobile>
        <div style={rightAreaStyleForMobile} >
          {(!playlist) ? <RightAreaComponentForCardpresent itemList={playlistListState} type="playlist"/> :
            <></>}
        </div>
      </Mobile>
    </>
      
    );
}

export default PlaylistPage
