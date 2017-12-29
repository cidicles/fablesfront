
import React, { Component } from 'react';
import Helmet from "react-helmet";
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <div key="home">
        <Helmet title={ lang.home.title + lang.helmet.siteTitle } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { lang: state.lang };
}

export default connect(mapStateToProps)(Home);
