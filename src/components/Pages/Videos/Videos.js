import React, { Component } from 'react';
import Helmet from "react-helmet";
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changeActiveVid } from '../../../Actions/Index';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import { truncate } from '../../../utils';
import './Videos.css';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  changeVid(vid){
    this.props.dispatch(changeActiveVid(vid));
  }
  getVideoThumb(video, index){
    if(video.type === 'youtube'){
      return(
        <span>
          <svg viewBox="0 0 24 24" alt={lang.videos.playVideo} className='btn-play'>
            <path d="M9 16.985v-10.021l9 5.157-9 4.864zm4-14.98c5.046.504 9 4.782 9 9.97 0 1.467-.324 2.856-.892 4.113l1.738 1.006c.732-1.555 1.154-3.285 1.154-5.119 0-6.303-4.842-11.464-11-11.975v2.005zm-10.109 14.082c-.568-1.257-.891-2.646-.891-4.112 0-5.188 3.954-9.466 9-9.97v-2.005c-6.158.511-11 5.672-11 11.975 0 1.833.421 3.563 1.153 5.118l1.738-1.006zm17.213 1.734c-1.817 2.523-4.769 4.175-8.104 4.175s-6.288-1.651-8.105-4.176l-1.746 1.011c2.167 3.122 5.768 5.169 9.851 5.169 4.082 0 7.683-2.047 9.851-5.168l-1.747-1.011z"/>
          </svg>
          <img src={`https://img.youtube.com/vi/${video.video}/mqdefault.jpg`} alt={video.title} className='thumb'/>
          <h2>{video.title}</h2>
          <p>{truncate(video.desc, 60)}</p>
        </span>
      );
    } else {
      return(
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" alt={lang.videos.playVideo} className='btn-play'>
            <path d="M9 16.985v-10.021l9 5.157-9 4.864zm4-14.98c5.046.504 9 4.782 9 9.97 0 1.467-.324 2.856-.892 4.113l1.738 1.006c.732-1.555 1.154-3.285 1.154-5.119 0-6.303-4.842-11.464-11-11.975v2.005zm-10.109 14.082c-.568-1.257-.891-2.646-.891-4.112 0-5.188 3.954-9.466 9-9.97v-2.005c-6.158.511-11 5.672-11 11.975 0 1.833.421 3.563 1.153 5.118l1.738-1.006zm17.213 1.734c-1.817 2.523-4.769 4.175-8.104 4.175s-6.288-1.651-8.105-4.176l-1.746 1.011c2.167 3.122 5.768 5.169 9.851 5.169 4.082 0 7.683-2.047 9.851-5.168l-1.747-1.011z"/>
          </svg>
          <img src={video.poster} alt={video.title} className='thumb'/>
          <h2>{video.title}</h2>
          <p>{truncate(video.desc, 60)}</p>
        </span>
      );
    }
  }
  render() {
    let {activeVid} = this.props;
    return (
      <div className="videos">
        <Helmet title={ lang.videos.title + lang.helmet.siteTitle } />
        <VideoPlayer
          type={activeVid.type}
          activeVid={activeVid.video}
          warn={lang.warnings.enableIframes}
          autoPlay='true'
          poster={activeVid.poster}
        />
        {lang.videos.videos.map((rows, index) => (
          <div className='row' key={`videorow-${index}`}>
            <div className='video-grid'>
              {rows.map((video, index) => (
                <a href='#player' className='item' onClick={() => this.changeVid(video)} key={`video-${index}`}>
                  {this.getVideoThumb(video, index)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { lang, activeVid } = state;
  return {
    lang,
    activeVid
  };
}

export default connect(mapStateToProps)(Videos);
