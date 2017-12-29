import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: '',
      password: '',
      status: ''
    };
  }
  sendAuth(){
    let feedUrl = `${apiBase}user`;
    let { username, password } = this.state;
    goFetch('post', feedUrl, { username, password }).then((res) => {
      if(res.error){
        this.setState({
          status: res.message
        });
      } else {
        this.setState({
          status: res.error.message
        });
      }
    });
  }
  getStatus(err){
    let { status } = this.state;
    if(status){
      return(
        <div className='status'>{ status }</div>
      )
    }
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Helmet title={ lang.register.title + lang.helmet.siteTitle } />
        <div className='section-heading'>
          <h1>{lang.register.title}</h1>
          <p>{lang.register.subtag}</p>
        </div>
        { this.getStatus() }
        <form className='form'>
          <fieldset>
            <h3>{lang.register.username}</h3>
            <input type="text" tabIndex="0" name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              />
          </fieldset>
          <fieldset>
            <h3>{lang.register.password}</h3>
            <input type="password" tabIndex="1" name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              />
          </fieldset>
          <div className='button-save' onClick={() => { this.sendAuth() }} tabIndex="1">
            {lang.general.submit}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { lang } = state;
  return {
    lang
  };
}

export default connect(mapStateToProps)(Register);
