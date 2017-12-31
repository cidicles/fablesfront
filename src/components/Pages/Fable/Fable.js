import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changePost, changeLocalState } from '../../../Actions/Index';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import Message from '../../Inputs/Message/Message';
import Character from '../../Inputs/Character/Character';
import {Link} from 'react-router';

import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import FaPencilSquare from 'react-icons/lib/fa/pencil-square';
import FaCog from 'react-icons/lib/fa/cog';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Fable.css';

class Fable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      userMenuClass: 'user-menu user-menu-active'
    };
    this.populatePost = this.populatePost.bind(this);
  }
  componentWillMount() {
    this.populatePost();
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  populatePost(){
    let requestedPid = this.props.routeParams.pid;
    let feedUrl = `${apiBase}fable/${requestedPid}`;
    let {localState} = this.props;
    goFetch('get', feedUrl).then((res) => {
      if(res.error){
        console.error(res.message);
      } else {
        this.props.dispatch(changePost(res));
        if(res._id === localState.id){
          this.props.dispatch(changeLocalState({
            id: localState.id ,
            count: localState.count > 0 ? localState.count : 0
          }));
        } else {
          this.props.dispatch(changeLocalState({
            id: res._id,
            count: 0
          }));
        }
      }
    });
  }
  toggleUserMenu(){
    let umClass = this.state.userMenuClass === 'user-menu' ? 'user-menu user-menu-active' : 'user-menu';
    this.setState({
      userMenuClass: umClass
    });
  }
  getUserContent(){
    let {userMenuClass} =  this.state;
    let {post, user} = this.props;
    if(post.creator === user.username){
      return(
        <div className={userMenuClass}>
          <div className='user-menu-toggle' onClick={() => this.toggleUserMenu()}><FaCog /></div>
          <Message post={post} user={user} success={this.populatePost} />
          <Character post={post} user={user} success={this.populatePost} />
        </div>
      );
    }
  }
  putLocalState(id) {
    this.props.dispatch(changeLocalState(id));
  }
  deleteMessage(messageId){
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
    console.log('edit message missing...');
  }
  getControls(id){
    let {post, user} = this.props;
    if(post.creator === user.username){
      return(
        <div className='message-controls'>
          {/*<FaPencilSquare onClick={() => this.editMessage()} />*/}
          <FaTimesCircle onClick={() => this.deleteMessage(id)} />
        </div>
      )
    }
  }

  progressMessage(){
    let {localState, post} = this.props;
    if(localState.count < post.messages.length){
      this.props.dispatch(changeLocalState({
        id: localState.id,
        count: localState.count + 1
      }));
    }
  }
  getMessages(){
    let messages = [];
    let {localState, post} = this.props;
    for(let i = 0; i < post.messages.length; i++){
      if(i < localState.count){

        // Determine Arrow Direction
        let arrowDirection = 'message left';
        let name = <sup>{post.messages[i].character}</sup>;
        if(post.messages[i].character === 'Self'){
          arrowDirection = 'message right';
          name = '';
        }

        // Determine Content
        let content = [];
        switch (post.messages[i].messageType[0]) { // TODO Why did I use an enum here on the backend again?
          case 'video':
            content.push(
              <iframe
                key={`message-body`}
                title='youtube'
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${post.messages[i].body}?rel=0&amp;showinfo=0`}
                frameBorder="0"
                allowFullScreen />
            );
            break;
          case 'image':
            content.push(
              <img key={`message-image`} src={post.messages[i].body} alt={post.messages[i].body} />
            );
            break;
          default:
            content.push(
              <p key={`message-body`}>{post.messages[i].body}</p>
            );
        }
        messages.push(
          <div className={arrowDirection} key={`message-${i}`}>
            { this.getControls(post.messages[i]._id) }
            {content}
            {name}
          </div>
        );
      }
    }
    messages.push(
      <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} key={`message-end`}>
     </div>
   );
    return messages;
  }
  getNextMessageButton() {
    let {localState, post} = this.props;
    if(localState.count < post.messages.length){
      return(
        <div className='next-message' onClick={() => this.progressMessage()}>{lang.fable.nextMessage}</div>
      )
    } else {
      return(
        <div className='end-message'>{lang.fable.endMessage}</div>
      )
    }
  }
  renderPost(){
    let {post} = this.props;
    return(
      <div className='post'>

        <div className='phone'>
          <div className='status-bar'>
            <p>{lang.fable.subtag}</p>
            <h1>{post.name}</h1>
            <Link to='/fables' className='status-back'>{lang.fable.back}</Link>
          </div>
          <div className='message-screen'>
            <div className='messages'>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionLeaveTimeout={300}>
                {this.getMessages()}
              </ReactCSSTransitionGroup>
            </div>
            {this.getNextMessageButton()}
          </div>
        </div>
        { this.getUserContent() }

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
  let { lang, post, user, localState } = state;
  return {
    lang,
    post,
    user,
    localState
  };
}

export default connect(mapStateToProps)(Fable);
