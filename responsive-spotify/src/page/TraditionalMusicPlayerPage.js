import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import WebPlayback from "../components/WebPlayback";
import { useNavigate, Outlet } from "react-router-dom";
import { DesktopOrTablet, Mobile } from "../components/MediaQuery";
import styled from "styled-components";
import useSearch from "../customHooks/forSearch/useSearch";

import "@fortawesome/fontawesome-free/css/all.min.css";

const AlbumIcon = styled.i``;
const ArtistIcon = styled.i``;
const PlaylistIcon = styled.i``;
const SearchIcon = styled.i``;
const AppStyle = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow-y: hidden;
  min-width: calc(280px + var(--global-margin) * 2);
`;

const MainBodyStyle = styled.div`
  display: flex;
  height: calc(100% - 20px);
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
`;

const LeftAreaStyle = styled.div`
  position: relative;
  box-sizing: border-box;
`;

const NavAreaStyle = styled.div`
  margin: var(--global-margin);
  margin-right: 0px;
  width: calc(
    var(--global-playlist-area-width) - 2 * var(--global-padding-for-card)
  );
  box-shadow: var(--global-box-shadow);
  border-radius: var(--global-border-radius);
  overflow: hidden;
  padding: var(--global-padding-for-card);
`;

const NavAreaEntryStyle = styled.div`
  padding: var(--global-padding-for-list-item);
  cursor: pointer;
  height: var(--height-nav-bar-entry);
  &:hover {
    background-color: var(--hover-color);
  }
  border-radius: 5px;
`;

const LyricAreaStyle = styled.div`
  margin: var(--global-margin);
  margin-right: 0px;
  width: var(--global-playlist-area-width);
  box-shadow: var(--global-box-shadow);
  height: calc(
    100% -
      calc(
        4 * var(--global-margin) + 6 * var(--global-padding-for-card) + 6 *
          var(--global-padding-for-list-item) + 3 * var(--height-nav-bar-entry) +
          var(--player-cover-size-desktop) + var(--playback-bar-height-desktop)
      )
  );
  border-radius: var(--global-border-radius);
`;

const PlayerStyleForDesktopOrTablet = styled.div`
  padding: var(--global-padding);
  width: 230px;
  box-shadow: var(--global-box-shadow);
  bottom: -10px;
  position: absolute;
  border-radius: var(--global-border-radius);
  left: var(--global-margin);
`;

const PlayerStyleForMobile = styled.div`
  position: fixed;
  width: auto;
  height: 100px;
  bottom: 0px;
  background-color: white;
  left: 10;
  right: 10;
  bottom: 10;
  border-radius: var(--global-border-radius);
  z-index: 5;
`;

const BackwardButton = styled.div`
  position: fixed;
  top: calc(50% - 50px);
  left: 0px;
  width: 50px;
  height: 100px;
  background-color: var(--global-background-color-dark);
  z-index: 99;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
  box-shadow: var(--global-box-shadow);
  opacity: 0.9;
`;

const ForwardButton = styled.div`
  position: fixed;
  top: calc(50% - 50px);
  right: 0px;
  width: 50px;
  height: 100px;
  background-color: var(--global-background-color-dark);
  z-index: 99;
  border-radius: 50px 0 0 50px;
  cursor: pointer;
  box-shadow: var(--global-box-shadow);
  opacity: 0.9;
`;

const SearchBarStyleForDesktopOrTablet = styled.div`
  position: fixed;
  top: 30px;
  left: 290px;
  width: ${(props) => props.width}px;
  height: 50px;
  border-radius: 50px 50px 50px 50px;
  cursor: pointer;
  transition-duration: 500ms;
  box-shadow: inset 20px 20px 60px #bfc4cb, inset -20px -20px 60px #ffffff;
  display: flex;
  align-items: center;
`;

const SearchBarStyleForMobile = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  width: ${(props) => props.width}px;
  height: 50px;
  border-radius: 50px 50px 50px 50px;
  cursor: pointer;
  transition-duration: 500ms;
  box-shadow: inset 20px 20px 60px #bfc4cb, inset -20px -20px 60px #ffffff;
  display: flex;
  align-items: center;
`;

const SearchBarInputStyle = styled.input`
  margin-left: 5px;
  height: 80%;
  width: ${(props) => props.width - 40}px;
  outline-style: none;
  border: 0;
  font-size: 24px;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #66727c;
  font-size: 20px;
  font-weight: bold;
  &::-webkit-input-placeholder {
    color: var(--placeholder-color);
  }
  &:-moz-placeholder {
    color: var(--placeholder-color);
  }
  &:-ms-input-placeholder {
    color: var(--placeholder-color);
  }
`;

function TraditionalMusicPlayerPage() {
  let token = sessionStorage.getItem("token");

  let [recentlyPlayedState, setRecentlyPlayedState] = useState(null);

  let [
    searchBarWidth,
    searchBarInputRef,
    extendSearchBarForDesktopOrTablet,
    extendSearchBarForMobile,
    withdrawSearchBarForDesktopOrTablet,
    withdrawSearchBarForMobile,
    handleSearch,
  ] = useSearch();

  useEffect(() => {
    if (recentlyPlayedState === null) {
      fetch(`/player/getRecentlyPlayed?token=${token}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setRecentlyPlayedState(json.items[0].track);
        });
    }
  }, [token]);

  const stopDrag = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        />
      </Helmet>

      <AppStyle>
        <MainBodyStyle>
          <LeftAreaStyle>
            <DesktopOrTablet>
              <NavAreaStyle>
                <NavAreaEntryStyle
                  onClick={() => navigate("/traditional/album")}
                >
                  <AlbumIcon className="fa-solid fa-compact-disc" />
                  <span style={{ paddingLeft: "10px" }}>Album</span>
                </NavAreaEntryStyle>
                <NavAreaEntryStyle
                  onClick={() => navigate("/traditional/artists")}
                >
                  <ArtistIcon className="fa-solid fa-palette" />
                  <span style={{ paddingLeft: "10px" }}>Artists</span>
                </NavAreaEntryStyle>
                <NavAreaEntryStyle
                  onClick={() => navigate("/traditional/playlist")}
                >
                  <PlaylistIcon className="fa-solid fa-list" />
                  <span style={{ paddingLeft: "10px" }}>Playlist</span>
                </NavAreaEntryStyle>
              </NavAreaStyle>
              <LyricAreaStyle />
            </DesktopOrTablet>

            {!token ? (
              <>
                <DesktopOrTablet>
                  <PlayerStyleForDesktopOrTablet />
                </DesktopOrTablet>

                <Mobile>
                  <PlayerStyleForMobile />
                </Mobile>
              </>
            ) : (
              <WebPlayback recentlyPlayedState={recentlyPlayedState} />
            )}
          </LeftAreaStyle>

          <Outlet />
        </MainBodyStyle>
        <Mobile>
          <ForwardButton
            onClick={() => {
              navigate(1);
            }}
          />
          <BackwardButton
            onClick={() => {
              navigate(-1);
            }}
          />
        </Mobile>

        <DesktopOrTablet>
          <SearchBarStyleForDesktopOrTablet
            width={searchBarWidth}
            onMouseOver={extendSearchBarForDesktopOrTablet}
            onMouseLeave={withdrawSearchBarForDesktopOrTablet}
          >
            <SearchIcon
              className="fa-solid fa-magnifying-glass"
              style={{ paddingLeft: "20px" }}
            />
            <SearchBarInputStyle
              width={searchBarWidth}
              ref={searchBarInputRef}
              onChange={handleSearch}
              onDragStart={stopDrag}
              placeholder="artists, tracks"
            />
          </SearchBarStyleForDesktopOrTablet>
        </DesktopOrTablet>

        <Mobile>
          <SearchBarStyleForMobile
            width={searchBarWidth}
            onMouseOver={extendSearchBarForMobile}
            onMouseLeave={withdrawSearchBarForMobile}
          >
            <SearchIcon
              className="fa-solid fa-magnifying-glass"
              style={{ paddingLeft: "20px" }}
            />
            <SearchBarInputStyle
              width={searchBarWidth}
              ref={searchBarInputRef}
              onChange={handleSearch}
              onDragStart={stopDrag}
              placeholder="artists, tracks"
            />
          </SearchBarStyleForMobile>
        </Mobile>
      </AppStyle>
    </div>
  );
}

export default TraditionalMusicPlayerPage;
