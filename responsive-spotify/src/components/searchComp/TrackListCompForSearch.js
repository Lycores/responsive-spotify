import TrackEntryComp from "../TrackEntryComp";
import styled from "styled-components";
import PlaceholderTrackEntryComp from "../placeholderComp/PlaceholderTrackEntryComp";
const TrackListContainer = styled.div``;
const TrackListCompForSearch = (props) => {
  let { width, topResultTracks } = props;
  if (topResultTracks.length !== 0) {
    let tracks = topResultTracks;
    if (width) {
      return (
        <TrackListContainer>
          {tracks.map((track, index) => {
            return (
              <TrackEntryComp
                width={width - 30}
                key={index}
                number={index + 1}
                track={track}
                albumId={track.album.id}
                positionInAlbum={track.track_number - 1}
                images={track.album.images}
                showImage={true}
                showNumber={false}
              />
            );
          })}
        </TrackListContainer>
      );
    } else {
      return (
        <TrackListContainer>
          {tracks.map((track, index) => {
            return (
              <TrackEntryComp
                key={index}
                number={index + 1}
                track={track}
                albumId={track.album.id}
                positionInAlbum={track.track_number - 1}
                images={track.album.images}
                showImage={true}
                showNumber={false}
              />
            );
          })}
        </TrackListContainer>
      );
    }
  } else {
    let result = [];
    for (let i = 0; i < 4; i++) {
      result.push(<PlaceholderTrackEntryComp key={i} />);
    }
    return <TrackListContainer>{result}</TrackListContainer>;
  }
};

export default TrackListCompForSearch;
