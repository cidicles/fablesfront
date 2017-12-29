import React, { Component } from 'react';
import './App.css';

// Common Components
import MainMenu from '../components/Navs/MainMenu/MainMenu';
import Footer from '../components/Navs/Footer/Footer';

// Transitions
import { RouteTransition } from 'react-router-transitioner';

class App extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        <div className="wrap" ref="container">
          <RouteTransition>
            { this.props.children }
          </RouteTransition>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
