import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500 } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
        };
    }



  
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
