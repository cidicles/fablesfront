import React, { Component } from 'react';
import './Character.css';
import { lang } from '../../../il8n/lang';
import { goFetch } from '../../../utils';
import { apiBase } from '../../../const';

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fableCharacter: '',
      ...props
    };
  }
  newFableCharacter(){
    let {fableCharacter} = this.state;
    let {token} = this.props.user;
    let {post, success} = this.props;
    let feedUrl = `${apiBase}fable/characters/${post._id}`;
    goFetch('post', feedUrl, { name: fableCharacter }, token).then((res) => {
      if(res.error){
        this.setState({
          status: res.error.message
        });
      } else {
        success();
        this.setState({
          fableCharacter: ''
        });
      }
    });
  }
  handleFableCharacterChange(e) {
    this.setState({
      fableCharacter: e.target.value
    });
  }
  getFableCharacterForm(){
    return(
      <form className='form'>
        <fieldset>
          <h3>{lang.fable.newCharacter}</h3>
          <input type="text" tabIndex="0"
            value={this.state.fableCharacter}
            onChange={this.handleFableCharacterChange.bind(this)}
            />
        </fieldset>
        <div className='button-save' onClick={() => { this.newFableCharacter() }} tabIndex="1">
          {lang.general.add}
        </div>
      </form>
    )
  }
  render() {
    return (
      <div>
        { this.getFableCharacterForm() }
      </div>
    );
  }
}

export default Character;
