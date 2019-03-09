import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/justicetext.png'
import sygnet from '../../assets/img/brand/favicon.png'
// Additional style
import './css/header.css'
// import logo from '../../assets/img/brand/logo.png'




class DefaultHeader extends Component {
  render() {
    return (
        <Nav className="Header HeaderFixed navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
          <AppNavbarBrand
          full={{ src: logo, width: 89, height: 50, alt: 'logo' }}
        />
          <div className="HeaderCaption">JusticeText</div>
        </Nav>
    );
  }
}



export default DefaultHeader;
