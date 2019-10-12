import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';
import Cards from './Components/Cards/index';
import Lists from './Components/lists/index';
import ListDetails from './Components/listdetails/listDisplay'

import Teams from './Components/Teams/index';
import Home from './Components/indexHome';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
     
        <BrowserRouter>
          <Switch>
          <Route exact path = "/" component={Home}/>
          <Route exact path = '/:username/cards' component={Cards}/>
          <Route exact path = '/:username/lists' component={Lists}/>
          <Route exact path = '/:username/teams' component={Teams}/>
          <Route exact path = '/list/:listid' component={ListDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
