import { Component } from 'react';
import Service from '../service/Service';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import Spinner from '../spinner/Spinner';

import './app.css';


class App extends Component {

  state = {
    data: [],
    term: "",
    filter: "all",
    isLoading: false
  }

  service = new Service();

  componentDidMount() {
      this.getData()
  }

  // ДОБАВЛЕНИЕ УДАЛЕНИЕ ИЗМЕНЕНИЕ
  getData = async () => {
    this.setState({
      isLoading: true
    })

    const data = await this.service.fetch();
    if (data) {
      this.setState({
        data,
        isLoading: false
      }) 
    } else {
      this.setState({
        data: [],
        isLoading: false
      }) 
      console.log("Запрос на получение данных не сработал.")
    }
  }

  onChangePerson = async (data, requestParam) => {
      const response =  await this.service.updateData(data, ...requestParam);

      if (response) {
        await this.getData();
      } else {
        console.log("Ошибка! Сервер не отвечает...")
      }
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

  filterData = (data, filter) => {
    switch(filter) {
      case 'to-increase':
        return data.filter(item => item.increase);
      case 'more1000':
        return data.filter(item => item.salary > 1000);
      case 'favourite':
        return data.filter(item => item.favourite);
      default:
        return data;
    }
  }


  render() {
    let {data, term, filter, isLoading} = this.state;
    const visibleData = this.filterData(this.onSearch(data, term), filter);
    const spinner = isLoading ? <Spinner/> : null;

    return (
      
        <div className="app">
              
              <AppInfo data={data}/>

              <div className="search-panel">
                  <SearchPanel
                    term={term}
                    onSearchUpdate={this.onSearchUpdate}
                  />
                  <AppFilter filter={filter} onFilterUpdate={this.onFilterUpdate}/>
              </div>
            
              {
                data?.length > 0 ? (
                  <EmployeesList  data={visibleData}
                                  onChangePerson={this.onChangePerson}
                                  />
                ) : (
                  <h2 className="empty-list-error">Список пуст или сервис не доступен.</h2>
                )
              }
              <EmployeesAddForm onChangePerson={this.onChangePerson}/>

              {spinner}
        </div>
      
      
    );
  }
  
}

export default App;
