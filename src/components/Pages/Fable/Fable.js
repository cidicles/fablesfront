import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changePost } from '../../../Actions/Index';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import Message from '../../Inputs/Message/Message';
import Character from '../../Inputs/Character/Character';

import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import FaPencilSquare from 'react-icons/lib/fa/pencil-square';

import './Fable.css';

class Fable extends Component {
  constructor(props) {
    super(props);
    this.state = {props};
    this.populatePost = this.populatePost.bind(this);
  }
  componentWillMount() {
    this.populatePost();
  }
  populatePost(){
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
  getUserContent(){
    let {post, user} = this.props;
    if(post.creator === user.username){
      return(
        <div>
          <Message post={post} user={user} success={this.populatePost} />
          <Character post={post} user={user} success={this.populatePost} />
        </div>
      )
    }
  }
  deleteMessage(messageId){
    let {fableMessage, fableCharacter} = this.state;
    let {token} = this.props.user;
    let {post} = this.props;
    let feedUrl = `${apiBase}fable/messages/${post._id}/${messageId}`;
    goFetch('delete', feedUrl, {}, token).then((res) => {
      if(res.error){
        console.log(res.message)
        this.setState({
          status: res.error.message
        });
      } else {
        this.populatePost();
      }
    });
  }
  editMessage(){
    console.log('edit message');
  }
  getControls(id){
    let {post, user} = this.props;
    if(post.creator === user.username){
      return(
        <div className='message-controls'>
          <FaPencilSquare onClick={() => this.editMessage()} />
          <FaTimesCircle onClick={() => this.deleteMessage(id)} />
        </div>
      )
    }
  }
  renderPost(){
    let {post, user} = this.props;
    return(
      <div className='post'>
        <div className='section-heading'>
          <p>{lang.fable.subtag}</p>
          <h1>{post.name}</h1>
        </div>
        <div className='grid two-col'>
          <div>
            <div className='messages'>
              {post.messages.map((item, index) => (
                <div className='message' key={`message-${index}`}>
                  { this.getControls(item._id) }


                  <p>{item.body}</p>
                  <sup>{item.character}</sup>
                </div>
              ))}
            </div>
          </div>
          { this.getUserContent() }
        </div>
      </div>
    )
  }
  render() {
    let {post} = this.props;
    return (
      <div className='fable'>
        <Helmet title={lang.fable.title + lang.helmet.siteTitle} />
        {post.name ? this.renderPost() : <div className="loading">{lang.loading}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { lang, post, user } = state;
  return {
    lang,
    post,
    user
  };
}

export default connect(mapStateToProps)(Fable);
