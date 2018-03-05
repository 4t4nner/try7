import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import ItemListView from "./view";
import {itemListClick, itemsFetchData} from "redux/actions/itemActions";
import {hashCode} from "../../utils";

const propTypes = {
    itemsString: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    itemType : PropTypes.string.isRequired
  };

class ItemListContainer extends Component {
    constructor(props) {
        super(props);

        this.handleClickItem = this.handleClickItem.bind(this);
    }

    componentDidMount() {
        // this.props.fetchData('/db/points');
    }

    componentWillReceiveProps(newProps) {
        this.state = Object.assign({}, this.state, newProps);
    }

    handleClickItem(code) {
        this.props.onItemListClick(code);
    }

    render() {
    return <ItemListView
        items={this.props.items}
        onItemClick={this.handleClickItem}
        itemType={this.props.itemType}
    />;
  }
}

ItemListContainer.propTypes = propTypes;

function mapStateToProps(state,props) {
    let itemState = state[state.commonState.itemStateName];
    return {
        items: itemState.items,
        itemsString: (itemState.items) // не убирать - без неё не работает
            ? hashCode(JSON.stringify(itemState.items))
            : 0,
        itemType: state.commonState.itemType
    };
}

function mergeProps(stateProps, dispatchProps) {

    const { dispatch } = dispatchProps;

    return Object.assign({}, stateProps, {
        onItemListClick: (code) => {
            dispatch(itemListClick(code));
        },
        fetchData: (url) => dispatch(itemsFetchData(url))
    });
}

export default connect(mapStateToProps, null,mergeProps)(ItemListContainer);

