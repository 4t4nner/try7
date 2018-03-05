import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import App from 'components/App';

import PointWindowController from 'components/PointWindow/controller';
import RouteWindowController from 'components/RouteWindow/controller';
// import ItemWindowPoint from 'components/PointWindow/controller';
// import ItemWindowRoute from 'components/PointWindow/routeView';
// import ItemList from 'components/ItemList/controller';

import PageLayout from 'components/PageLayout';
// import HelloWorldPage from 'components/HelloWorldPage';
let store;

export default function routes(storeRef) {
  store = storeRef;

  return (
      <Router history={browserHistory}>
          <Route component={App} path='/'>
              <Route component={PageLayout}>
                  <Route component={PointWindowController} path='points'/>
                  <Route component={RouteWindowController} path='routes'/>
              </Route>

          </Route>
      </Router>
  );
}

