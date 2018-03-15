import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import WindowView from './view';
// import routeWindowView from './routeView';
import {itemsFetchData} from 'redux/actions/itemActions';
import {addItem, editItem,deleteItem} from '../../redux/actions/itemActions';
import {setItemType} from 'redux/actions/itemActions';


const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
};

class NewItemContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

    componentDidMount() {
        this.props.fetchData('/db/points');
    }

    componentWillReceiveProps(newProps) {
      if(newProps.itemType !== this.props.itemType){
          let itemType = window.location.pathname;
          itemType = itemType.substr(1,itemType.length-2);
          this.props.dispatch(setItemType(itemType));
      }
    }

    handleClickSave(item) {
        if (this.props.item) {
            this.props.dispatch(editItem(item));
        } else {
            this.props.dispatch(addItem(item));
        }

    }
    handleClickDelete(item) {
        if (this.props.item) {
            this.props.dispatch(deleteItem(item));
        }
    }

  render() {

    return <WindowView
        item={this.props.item}
        onSaveClick={this.handleClickSave}
        onDeleteClick={this.handleClickDelete}
    /> ;

  }
}

NewItemContainer.propTypes = propTypes;

function mapStateToProps(state) {

  return {
      itemType : state.commonState.itemType,
      item: state.pointState.item
  };
}

function mergeProps(stateProps, dispatchProps) {

    const { dispatch } = dispatchProps;

    return Object.assign({}, stateProps, {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        dispatch: dispatch
    });
}

export default connect(mapStateToProps, null,mergeProps)(NewItemContainer);
