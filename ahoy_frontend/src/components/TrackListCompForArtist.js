import TrackEntryComp from "./TrackEntryComp";
import React from "react";
import PlaceholderTrackEntryComp from "./PlaceholderTrackEntryComp";
import "../stylesheets/css/placeholderCardComponentStyleSheet.css";
import styled from "styled-components";

const StyleForTrackContainer = styled.div`
  box-shadow: var(--global-box-shadow);
  border-radius: var(--global-border-radius);
  margin: var(--global-margin);
  overflow: hidden;
`;

var increaseKey = 999;
const TrackListCompForArtist = React.memo((props) => {
  let { artistTopTrack } = props;
  let renderQueue = [];

  if (artistTopTrack.length != 0) {
    let tracks = artistTopTrack.tracks;
    renderQueue.push(
      <StyleForTrackContainer key={increaseKey + 1}>
        {tracks.map((track, index) => {
          return (
            <TrackEntryComp
              position={index + 1}
              key={track.id}
              track={track}
              albumId={track.album.id}
              positionInAlbum={track.track_number - 1}
              images={track.album.images}
              showImage={true}
            />
          );
        })}
      </StyleForTrackContainer>
    );
    increaseKey++;
  } else {
    for (let i = 0; i < 10; i++) {
      renderQueue.push(<PlaceholderTrackEntryComp key={increaseKey + i} />);
    }
    increaseKey += 10;
  }

  return renderQueue;
});

export default TrackListCompForArtist;