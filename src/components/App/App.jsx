import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import './bootstrap.css';
import './myStyle.css';

const propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
  children: PropTypes.node
};

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer to='/points'>
                <NavItem>Точки</NavItem>
              </LinkContainer>
              <LinkContainer to='/routes'>
                <NavItem>Маршруты</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}


App.propTypes = propTypes;

function mapStateToProps(state) {
  return { userSignedIn: true };
}

export default connect(mapStateToProps)(App);

