import React, {Component, PropTypes} from "react";

const propTypes = {
  onSaveClick: PropTypes.func,
    item: PropTypes.object.isRequired
};

const defaultProps = {
  onSaveClick: (data) => {}
};

class NewPointView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compTitle : 'Добавить',
            title: '',
            code: '',
            active: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValue = this.setValue.bind(this);

    }

    componentWillReceiveProps(newProps) {
        this.setState((newProps.item)
            ? {
                compTitle: newProps.item.title,
                title: newProps.item.title,
                code: newProps.item.code,
                active: (newProps.item.active)
            }
            : {
                compTitle : 'Добавить',
                title : '',
                code : '',
                active : false

            }
        );
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    handleSubmit(e){
        e.preventDefault();

        let title = this.state.title.trim();
        let code =  this.state.code.trim();
        let active = this.state.active === 'on' || this.state.active === true;
        let id = this.props.item.id;
        this.props.onSaveClick({title, code, active,id});
    }

    setValue (event) {
        let object = {};
        let field = event.target.name;
        if(field === 'active'){
            object[field] = event.target.checked;
        } else {
            object[field] = event.target.value;
        }
        this.setState(object);
    }

    render() {

        const isChecked = this.state.active;
        return (
            <div>
                <div className='col-md-8'>
                    {/*<h2>{this.state.compTitle}</h2>*/}
                    <h2>Рассчитайте маршруты</h2>
                    <form onSubmit={this.handleSubmit}>

                        <button
                            type="button"
                            value="delete" className="btn btn-default"
                        >
                            Рассчитать
                        </button>
                        {/*
                        <div className='form-group'>
                            <input name='title' type='text' className='form-control'
                                   placeholder='Название маршрута'
                                   onChange={this.setValue}
                                   value={this.state.title}
                            />
                        </div>
                        <div className='form-group'>

                            <input name='code' type='text' className='form-control' placeholder='Код маршрута'
                                   readOnly=''
                                   onChange={this.setValue}
                                   value={this.state.code}
                            />
                        </div>
                        <div className='checkbox left'>
                            <label>
                                <input type='checkbox' name='active'
                                       checked={isChecked}
                                    // onChange={this.setValue}
                                       onClick={this.setValue}
                                />
                                активность
                            </label>
                        </div>
                        <div className="right">
                            <button
                                type="submit"
                                value="save" className="btn btn-default"
                            >
                                Сохранить
                            </button>
                        </div>
                        */}


                    </form>
                </div>
            </div>
        );
    }
}

NewPointView.propTypes = propTypes;
NewPointView.defaultProps = defaultProps;

export default NewPointView;


