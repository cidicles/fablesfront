import React, { Component } from 'react';
import './Message.css';
import { lang } from '../../../il8n/lang';
import { goFetch } from '../../../utils';
import { apiBase } from '../../../const';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fableCharacter: 'Self',
      ...props
    };
  }
  newFableMessage(){
    let {fableMessage, fableCharacter} = this.state;
    let {token} = this.props.user;
    let {post, success} = this.props;
    let feedUrl = `${apiBase}fable/messages/${post._id}`;
    goFetch('post', feedUrl, { messages: fableMessage, character: fableCharacter }, token).then((res) => {
      if(res.error){
        console.log(res.message)
        this.setState({
          status: res.error.message
        });
      } else {
        success();
        this.setState({
          fableMessage: ''
        });
      }
    });
  }
  handleFableMessageChange(e) {
    this.setState({
      fableMessage: e.target.value
    });
  }
  handleFableCharacterChange(e) {
    this.setState({
      fableCharacter: e.target.value
    });
  }
  getFableMessageForm(){
    let {post} = this.props;
    return(
      <form className='form'>
        <fieldset>
          <h3>{lang.fable.newMessage}</h3>
          <textarea rows='5' type="text" tabIndex="0" name="username"
            value={this.state.fableMessage}
            onChange={this.handleFableMessageChange.bind(this)}
            />
          <select onChange={this.handleFableCharacterChange.bind(this)}>
            <option defaultValue value='Self'>Self</option>
            {post.characters.map((item, index) => (
              <option value={item.name} key={`character-${index}`}>{item.name}</option>
            ))}
          </select>
        </fieldset>
        <div className='button-save' onClick={() => { this.newFableMessage() }} tabIndex="1">
          {lang.general.add}
        </div>
      </form>
    )
  }

  render() {
    return (
      <div>
        { this.getFableMessageForm() }
      </div>
    );
  }
}

export default Message;
