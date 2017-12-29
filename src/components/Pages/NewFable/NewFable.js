import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { apiBase } from '../../../const';
import { goFetch } from '../../../utils';
import PropTypes from 'prop-types';
import './NewFable.css';

class NewFable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      fableName: '',
      status: ''
    };
  }
  newFable(){
    let feedUrl = `${apiBase}fable`;
    let { fableName } = this.state;
    let {token} = this.props.user;
    goFetch('post', feedUrl, { name: fableName }, token).then((res) => {
      if(res.error){
        console.log(res.message)
        this.setState({
          status: res.error.message
        });
      } else {
        this.context.router.push('/posts/' + res._id);
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
  handleFableNameChange(e) {
    this.setState({
      fableName: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Helmet title={ lang.newFable.title + lang.helmet.siteTitle } />
        <div className='section-heading'>
          <h1>{lang.newFable.title}</h1>
          <p>{lang.newFable.subtag}</p>
        </div>
        { this.getStatus() }
        <form className='form'>
          <fieldset>
            <h3>{lang.newFable.fableName}</h3>
            <input type="text" tabIndex="0" name="username"
              value={this.state.fableName}
              onChange={this.handleFableNameChange.bind(this)}
              />
          </fieldset>
          <div className='button-save' onClick={() => { this.newFable() }} tabIndex="1">
            {lang.general.submit}
          </div>
        </form>
      </div>
    );
  }
}

NewFable.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  let { lang, user } = state;
  return {
    lang,
    user
  };
}

export default connect(mapStateToProps)(NewFable);
