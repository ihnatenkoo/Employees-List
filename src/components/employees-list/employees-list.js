import { Component } from "react";
import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onChangePerson}) => (

    <ul className="app-list list-group">
        {data.map((person, i) => {
            return (
                <EmployeesListItem  person={person} 
                                    key={i}
                                    onChangePerson={onChangePerson}
                                    />
            )
        })}
    </ul>

)



            
        
    
    


export default EmployeesList;