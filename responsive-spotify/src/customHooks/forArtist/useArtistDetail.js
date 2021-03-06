import { useState, useEffect, useRef, useCallback } from "react";
const useArtistDetail = (artist) => {
  let userProfileState = JSON.parse(sessionStorage.getItem("userProfile"));

  let [artistTopTrackState, setArtistTopTrackState] = useState([]);
  let [artistAlbumsState, setArtistAlbumsState] = useState([]);
  let [coverBackgroundImageState, setCoverBackgroundImageState] = useState("");
  let [
    artistOverviewBackgroundImageState,
    setArtistOverviewBackgroundImageState,
  ] = useState("");

  let offset = useRef(0);
  let limit = useRef(10);
  let hasMoreAlbumForArtist = useRef(true);
  let token = sessionStorage.getItem("token");

  const getArtistTopTrack = useCallback(() => {
    fetch(
      `/artists/getArtistTopTrack?artistId=${artist.id}&market=${userProfileState.country}&token=${token}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setArtistTopTrackState(json);
      });
  }, [artist, token]);

  const getArtistAlbums = useCallback(() => {
    if (hasMoreAlbumForArtist.current) {
      fetch(
        `/artists/getArtistAlbums?artistId=${artist.id}&limit=${limit.current}&offset=${offset.current}&market=${userProfileState.country}&token=${token}`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          offset.current += limit.current;
          if (offset.current < json.total) {
            hasMoreAlbumForArtist.current = true;
          } else {
            hasMoreAlbumForArtist.current = false;
          }
          setArtistAlbumsState((prevAlbums) => {
            return [...prevAlbums, ...json.items];
          });
        });
    }
  }, [hasMoreAlbumForArtist, artist, offset, token]);

  useEffect(() => {
    setCoverBackgroundImageState(artist.images[1].url);
    setArtistOverviewBackgroundImageState(artist.images[0].url);
    getArtistTopTrack();
    getArtistAlbums();
  }, [artist]);

  return [
    artistTopTrackState,
    artistAlbumsState,
    coverBackgroundImageState,
    artistOverviewBackgroundImageState,
    getArtistAlbums,
  ];
};

export default useArtistDetail;
