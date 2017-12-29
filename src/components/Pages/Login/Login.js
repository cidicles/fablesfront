import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changeUser } from '../../../Actions/Index';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: 'test',
      password: 'test',
      status: ''
    };
  }
  sendAuth(){
    let feedUrl = `${apiBase}user/login`;
    let { username, password } = this.state;
    goFetch('post', feedUrl, { username, password }).then((res) => {
      if(res.error){
        this.setState({
          status: res.message
        });
      } else {
        this.props.dispatch(changeUser({
          username: res.user.username,
          token: res.token
        }));
        this.setState({
          status: 'Login success'
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
        <Helmet title={ lang.login.title + lang.helmet.siteTitle } />
        <div className='section-heading'>
          <h1>{lang.login.title}</h1>
          <p>{lang.login.subtag}</p>
        </div>
        { this.getStatus() }
        <form className='form'>
          <fieldset>
            <h3>{lang.login.username}</h3>
            <input type="text" tabIndex="0" name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              />
          </fieldset>
          <fieldset>
            <h3>{lang.login.password}</h3>
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

export default connect(mapStateToProps)(Login);
