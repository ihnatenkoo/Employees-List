import { Component } from 'react';
import Service from '../service/Service';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

  state = {
    data: [],
    term: "",
    filter: "all"
  }

  service = new Service();

  componentDidMount() {
      this.getData()
  }

  // ДОБАВЛЕНИЕ УДАЛЕНИЕ ИЗМЕНЕНИЕ
  getData = async () => {
    const data = await this.service.fetch();
    this.setState({
        data
    })
    console.log(data)
  }

  onAddPerson = async (data) => {
      await this.service.updateData(data,"POST","");
      await this.getData();
  }

  onDeletePerson = async (id) => {
      await this.service.updateData({}, "DELETE", id);
      await this.getData();
  }

  onAddIncrease = async (id, data) => {
      await this.service.updateData(data, "PUT", id);
      await this.getData();
  }

  // ПОИСК ФИЛЬТРОВКА
  onSearchUpdate = (term) => {
    this.setState({
      term
    })
  }

  onSearch = (items, term) => {
    if (term === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(term)  > -1
    })
  }

  onFilterUpdate = (filter) => {
    this.setState({
      filter
    })
  }


  render() {
    let {data, term} = this.state;
    const visibleData = this.onSearch(data, term)

    return (
      <div className="app">
          <AppInfo />
  
          <div className="search-panel">
              <SearchPanel  onSearchUpdate={this.onSearchUpdate}/>
              <AppFilter onFilterUpdate={this.onFilterUpdate}/>
          </div>
          
          <EmployeesList  data={visibleData}
                          onDeletePerson={this.onDeletePerson}
                          onAddIncrease={this.onAddIncrease}
                          />
          <EmployeesAddForm onAddPerson={this.onAddPerson}/>
      </div>
    );
  }
  
}

export default App;
