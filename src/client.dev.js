import React      from 'react';
import ReactDOM   from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';
import DevTools from './components/DevTools';

// styles
import './assets/sass/main.scss';

// non react libs
// require('script!./assets/js/ymaps');


const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

const component = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes(store)}
    </Router>
  </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));

