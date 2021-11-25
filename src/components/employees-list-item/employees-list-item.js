import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    
    render() {
        const {name, salary, increase, favourite, id} = this.props.person;
        let classList = "list-group-item d-flex justify-content-between"
        classList = increase ? classList +=" increase" : classList;
        classList = favourite ? classList +=" like" : classList;

        return (
            <li className={classList}>
                <span   onClick={() => this.props.onAddIncrease(id, {name, salary, favourite: !favourite, increase})}
                        className="list-group-item-label">{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + "$"}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button onClick={() => this.props.onAddIncrease(id, {name, salary, favourite, increase: !increase})}
                            type="button"
                            className="btn-cookie btn-sm ">
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button onClick={() => this.props.onDeletePerson(id)}
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