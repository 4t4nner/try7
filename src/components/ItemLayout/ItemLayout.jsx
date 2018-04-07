import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
  children: PropTypes.node
};

class ItemLayout extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Управление маршрутами и рейсами</h1>
          <button
              type="button"
              value="delete" className="btn btn-default"
              style={{
                  float: 'right'
              }}
          >
            Рассчитать
          </button>
            {/*{this.props.children}*/}
        </div>

      </div>
    );
  }
}


ItemLayout.propTypes = propTypes;

function mapStateToProps(state) {
  return { /*userSignedIn: true*/ };
}

export default connect(mapStateToProps)(ItemLayout);
