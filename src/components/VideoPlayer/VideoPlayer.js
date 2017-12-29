import React, { Component } from 'react';
import './VideoPlayer.css';

class VideoPlayer extends Component {
  getPlayer(){
    let {activeVid, warn, type, autoPlay, poster} = this.props;
    switch(type){
      case 'youtube':
        return(
          <div className="video-wrapper" id="player">
            <iframe title="videoplayer" width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVid}?rel=0&autoplay=1`} frameBorder="0" allowFullScreen>
              {warn}
            </iframe>
          </div>
        );
      default:
        return(
          <div className="video-wrapper" id="player">
            <video controls={true} autoPlay={autoPlay} poster={poster} src={activeVid} />
          </div>
        );
    }
  }
  render() {
    return (
      <div>
        { this.getPlayer() }
      </div>
    );

  }
}

export default VideoPlayer;
