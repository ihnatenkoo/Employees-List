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