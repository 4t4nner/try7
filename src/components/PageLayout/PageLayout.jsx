import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import YMap from 'components/YMap';
// import MiddleButtons from 'components/MiddleButtons';
import ItemList from 'components/ItemList/controller';
// import ItemWindow from 'components/PointWindow/controller';
import {setItemType} from 'redux/actions/itemActions';

const propTypes = {
    children: PropTypes.node
};

class PageLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemType : false
        };
    }

    // componentWillMount(){
    //     console.log(window);
    // }

    componentDidMount() {
        this.setState(Object.assign({}, this.state, {componentMounted : true}));

        console.log('componentDidMount');
        let itemType = window.location.pathname;
        itemType = itemType.substr(1,itemType.length-2);
        if(itemType !== this.state.itemType){
            this.props.dispatch(setItemType(itemType));
            this.setState( {itemType :itemType} );
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.state.componentMounted ){

            let itemType = window.location.pathname;
            itemType = itemType.substr(1,itemType.length-2);
            if(itemType !== this.state.itemType){
                this.props.dispatch(setItemType(itemType));
                this.setState( {itemType :itemType} );
            }
        }
    }

  render() {
      let title = '';
      let location = '';
        if(this.state && this.state.componentMounted){
            location = this.state.itemType;
            title = 'Управление ' + ((location === 'route') ? 'маршрутами' : 'точками');

        }

        console.log(this.state);
    return (
        <div id='PageLayout'>
            {(this.state && this.state.componentMounted)
            && <div>
                <YMap/>
                <hr/>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1> {title} </h1>
                        <div className='component-demo-routes'>
                            <ItemList itemType={this.state.itemType}/>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
  }
}
PageLayout.propTypes = propTypes;

export default connect()(PageLayout);
