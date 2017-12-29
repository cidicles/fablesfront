import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changePost } from '../../../Actions/Index';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {props};
  }
  componentWillMount() {
    this.populatePosts();
  }
  populatePosts(vid){
    let requestedPid = this.props.routeParams.pid;
    let feedUrl = `${apiBase}fable/${requestedPid}`;
    goFetch('get', feedUrl).then((res) => {
      if(res.error){
        console.error(res.message);
      } else {
        this.props.dispatch(changePost(res));
      }
    });
  }
  renderPost(){
    let {post} = this.props;
    return(
      <div className='post'>
        <h1>{post.name}</h1>
        {post.messages.map((item, index) => (
          <div key={`message-${index}`}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    )
  }
  render() {
    let {post} = this.props;
    return (
      <div className="post">
        <Helmet title={lang.post.title + lang.helmet.siteTitle} />
        {post.name ? this.renderPost() : <div className="loading">{lang.loading}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { lang, post } = state;
  return {
    lang,
    post
  };
}

export default connect(mapStateToProps)(Post);
