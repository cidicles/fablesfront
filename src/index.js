// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// Analytics
import ReactGA from 'react-ga';
import {UA} from './const';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './Reducers/Main';

// Pages
import App from './App/App';
import Home from './components/Pages/Home/Home';
import Videos from './components/Pages/Videos/Videos';
import Fables from './components/Pages/Fables/Fables';
import Fable from './components/Pages/Fable/Fable';
import NoMatch from './components/Pages/NoMatch/NoMatch';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import NewFable from './components/Pages/NewFable/NewFable';

// Helpers
import throttle from 'lodash/throttle';
import { saveState } from './utils';

// Global Assets
/*eslint-disable no-unused-vars*/
/*eslint-enable no-unused-vars*/

// Global CSS
import './index.css';

// Create the Store
let store = createStore(
  Reducers,
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : false
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000)


// Analytics
ReactGA.initialize(UA);
function logPageView() {
  window.scrollTo(0, 0); // messy - alternative solutions very welcome
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

// Define Routes
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/videos',
    exact: true,
    component: Videos
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register
  },
  {
    path: '/fables/:pid',
    exact: false,
    component: Fable
  },
  {
    path: '/fables',
    exact: true,
    component: Fables
  },
  {
    path: '/new-fable',
    exact: true,
    component: NewFable
  },
  {
    path: '*',
    exact: false,
    component: NoMatch
  }
];

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory } onUpdate={logPageView}>
      <Route component={ App }>
        {routes.map((route, index) => (
          <Route
            key={ index }
            path={ route.path }
            exact={ route.exact }
            component={ route.component }
          />
        ))}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
