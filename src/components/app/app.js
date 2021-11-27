import { Component } from 'react';
import Service from '../service/Service';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

  // Тут лучше добавить в состояние какое-то поле, типа isFetching
  // при старте оно false, после завершения запроса this.getData() - тоже false
  // но при каждом вызове this.getData() оно должно переключаться в true, а потом - в false
  // при true можно выводить какой-то спиннер или просто писать что-то вроде Loading...
  // на таком сервере время ожидания очень маленькое,
  // но если медленный интернет и тд - пользователь понимает что что-то происходит
  state = {
    data: [],
    term: "",
    filter: "all",
    isFetching: false,
  }

  service = new Service();

  componentDidMount() {
      this.getData()
  }

  // ДОБАВЛЕНИЕ УДАЛЕНИЕ ИЗМЕНЕНИЕ
  getData = async () => {
    this.setState({
      isFetching: true,
    })

    const data = await this.service.fetch();

    if (data) {
      this.setState({
          data,
          isFetching: false,
      });
    } else {
      // Обрабатываем падение сервера
      this.setState({
        data: [],
        isFetching: false,
      });

      console.log('Запрос на получение данных не сработал.');
    }
  }

  onAddPerson = async (data) => {
      const response = await this.service.updateData(data,"POST","");

      // Если во время запроса падает сервер - нужно обрабатывать ошибки
      // в противном случае приложение может упасть
      // потому что this.getData() шлет запрос на новые данные и не получает их
      if (response) {
        await this.getData();
      } else {
        // Тут можно как-то информировать пользователя об ошибке
        console.log('Ошибка! Сервер временно не доступен!');
      }
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
    let {data, term, filter, isFetching} = this.state;
    const visibleData = this.filterData(this.onSearch(data, term), filter);

    return (
      <div className="app">
        {/* Проверка загрузки */}
        {
          !isFetching ? (
            <>
              <AppInfo data={data}/>
      
              <div className="search-panel">
                  <SearchPanel
                    term={term}
                    onSearchUpdate={this.onSearchUpdate}
                  />
                  <AppFilter filter={filter} onFilterUpdate={this.onFilterUpdate}/>
              </div>
              
              {/* Обработка падения сервера или случая, когда наша база новая и еще пустая */}
              {/* с этой проверкой можно запускать приложение без сервера и оно больше не падает */}
              {
                data?.length > 0 ? (
                  <EmployeesList  data={visibleData}
                                  onDeletePerson={this.onDeletePerson}
                                  onAddIncrease={this.onAddIncrease}
                                  />
                ) : (
                  <h1>Пока что работников нет или сервис не доступен.</h1>
                )
              }
              <EmployeesAddForm onAddPerson={this.onAddPerson}/>
            </>
          ) : (
            <h1>Контент загружается!</h1>
          )
        }
      </div>
    );
  }
  
}

export default App;
