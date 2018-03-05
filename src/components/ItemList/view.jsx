import React, {Component, PropTypes} from "react";


const propTypes = {
    onItemClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

class ItemListView extends Component {
    constructor(props) {
        super(props);

        this.btnStyle='display: block';

    }

    handleItemClick(item, e){

        let code = item.code;
        this.props.onItemClick(code);
    }

    render() {

        const btnStyle = {
            display: 'block'
        };

        const captions = (this.props.itemType === 'route')
            ? {
                listHeading: 'Список маршрутов',
                newItem : ' Новый маршрут'
            }
            : {
                listHeading: 'Список точек',
                newItem : ' Новая точка'
            };

        return (
          <div className="col-md-4">
              <h2>{captions.listHeading}</h2>
              <div className="list-group">
                  <button style={btnStyle}
                          className="list-group-item"
                          onClick={this.handleItemClick.bind(this, false)}
                          >
                      <span className="btn-element glyphicon glyphicon-plus" aria-hidden="true"></span>
                      {captions.newItem}
                  </button>
                  {this.props.items.map((item) => (
                      <button
                          style={btnStyle}
                          className="list-group-item btn-list"
                          data-code={item.code}
                          onClick={this.handleItemClick.bind(this, item)}
                      >
                          <h4 className="btn-element">{item.title}</h4>
                          <p className="btn-element">{item.active?'on':'off'}</p>
                      </button>
                  ))}
              </div>
          </div>
      );
  }
}

ItemListView.propTypes = propTypes;
// ItemListView.defaultProps = defaultProps;

export default ItemListView;
