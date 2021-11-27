// Это не компонент, тут нужно название с малой буквы
// такие вещи лучше заносить в папку api/index.js если их не много
// и там создается функция или класс с методами для работы с API
// если запросов много - тогда на каждую группу запросов
// по отдельному файлу и все собрать вместе в index.js

class Service {
  fetch = async () => {
    try {
      const res = await fetch('http://localhost:3001/data');
      if (res.ok) {
        return await res.json();
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  updateData = async (data, method, id) => {
    try {
      const res = await fetch(`http://localhost:3001/data/${id}`, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      return await res.json();
    }
    catch (error) {
      console.log(error);
    }
  }
  
}

export default Service;