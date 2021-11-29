import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    
    state = {
        value: ""
    }

    onChange = (event) => {
        const {name, increase, favourite, id} = this.props.person;
        this.setState({
            value: event.target.value
        });
        this.props.onChangePerson({name, salary: event.target.value, favourite, increase}, ["PUT", id])
    }
    


    render() {
        const {name, salary, increase, favourite, id} = this.props.person;
        const {value} = this.state.value;
        const {onChangePerson} = this.props;

        let classList = "list-group-item d-flex justify-content-between";
        classList = increase ? classList +=" increase" : classList;
        classList = favourite ? classList +=" like" : classList;
       
        return (
            <li className={classList}>
                <span   onClick={() => onChangePerson({name, salary, favourite: !favourite, increase}, ["PUT", id])}
                        className="list-group-item-label">{name}</span>
                <input  onChange={this.onChange}                    
                       
                        type="number" className="list-group-item-input" value={value ? value : salary}/>
                <div className='d-flex justify-content-center align-items-center'>

                    <button 
                            onClick={() => onChangePerson({name, salary, favourite, increase: !increase}, ["PUT", id])}
                            type="button"
                            className="btn-cookie btn-sm ">
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button 
                            onClick={() => onChangePerson({}, ["DELETE", id])}
                            type="button"
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>

                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
    
}

export default EmployeesListItem;