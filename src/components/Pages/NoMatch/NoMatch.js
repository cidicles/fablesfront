import React, { Component } from 'react';
import Helmet from "react-helmet";
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import './NoMatch.css';

class NoMatch extends Component {
  render() {
    return (
      <div className="nomatch">
        <Helmet title={ lang.nomatch.title + lang.helmet.siteTitle } />
        <h1>{ lang.nomatch.title }</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
   return { lang: state.lang };
}

export default connect(mapStateToProps)(NoMatch);
