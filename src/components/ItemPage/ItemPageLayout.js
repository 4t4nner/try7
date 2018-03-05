import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const propTypes = {
    // userSignedIn: PropTypes.bool.isRequired,
    children: PropTypes.node
};
class ItemPageLayout extends Component {
    render() {
        return (
            <div className='items-window'>
                <div className='row'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ItemPageLayout.propTypes = propTypes;

function mapStateToProps(state) {
    return { /* userSignedIn: isUserSignedIn(state) */ };
}

export default connect(mapStateToProps)(ItemPageLayout);