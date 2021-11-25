import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    state = {
        name: "",
        salary: ""
    }
    onChange = (event) => {
        this.setState({
           [event.target.name] : event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {name, salary} = this.state;
        if (name.length > 2 & !isNaN(salary)) {
            this.props.onAddPerson({name, salary, increase: false, favourite: false})
            this.setState({
                name:"",
                salary:""
            })
        }

    }

    render() {
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form onSubmit={this.onSubmit}
                    className="add-form d-flex">
                    <input  onChange={this.onChange}
                            name="name"
                            type="text"
                            value={this.state.name}
                            className="form-control new-post-label"
                            placeholder="Как его зовут?" />

                    <input  onChange={this.onChange}
                            type="number"
                            name="salary"
                            value={this.state.salary}
                            className="form-control new-post-label"
                            placeholder="З/П в $?" />
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
   
}

export default EmployeesAddForm;