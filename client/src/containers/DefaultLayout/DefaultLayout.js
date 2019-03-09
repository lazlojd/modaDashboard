import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Nav, NavItem } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import Header from './AppHeader';
import HeaderImage from './AppHeaderImage'



class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <HeaderImage></HeaderImage>
        <div className="app-body NoMargin">
          <main className="main white">
          <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        
        </div>
       {/*Future footer goes here*/}
      </div>
    );
  }
}

export default DefaultLayout;
