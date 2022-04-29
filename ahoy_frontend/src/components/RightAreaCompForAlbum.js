import "bootstrap/dist/css/bootstrap-grid.css";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  RightAreaContainerStyle,
  BackgroundFilterStyle,
  RightAreaCoverStyle,
  RightAreaOverviewStyle,
  DescriptionStyle,
  RightAreaCoverContainerStyle,
} from "./ReusableStyleComp";
import TrackListCompForAlbum from "./TrackListCompForAlbum";
import useAlbumDetail from "../customHooks/useAlbumDetail";
const AlbumNameStyle = styled.div`
  width: 100%;
  margin-top: clamp(100px, 15vw, 180px);
  text-align: left;
  font-size: clamp(30px, 5vw, 100px);
  -webkit-line-clamp: 3;
`;

const RightAreaCompForAlbum = React.memo((props) => {
  let { album } = props;

  let [
    tracks,
    albumId,
    coverBackgroundImageState,
    albumOverviewBackgroundImageState,
  ] = useAlbumDetail(album);

  return (
    <RightAreaContainerStyle>
      <RightAreaOverviewStyle imageUrl={albumOverviewBackgroundImageState}>
        <BackgroundFilterStyle>
          <RightAreaCoverContainerStyle>
            <RightAreaCoverStyle imageUrl={coverBackgroundImageState} />
          </RightAreaCoverContainerStyle>
          <DescriptionStyle>
            <AlbumNameStyle>{album.name}</AlbumNameStyle>
          </DescriptionStyle>
        </BackgroundFilterStyle>
      </RightAreaOverviewStyle>
      <TrackListCompForAlbum tracks={tracks} albumId={albumId} />
    </RightAreaContainerStyle>
  );
});

export default RightAreaCompForAlbum;