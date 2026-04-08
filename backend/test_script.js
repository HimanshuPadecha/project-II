const axios = require('axios');

async function test() {
  try {
    const api = axios.create({ baseURL: 'http://localhost:3000/api/v1', withCredentials: true });
    let token = '';

    // Create user 
    try {
      await api.post('/users/signup', { username: 'testuser1', password: 'testpassword1', email: 'test1@test.com' });
    } catch(e) {}

    const loginRes = await api.post('/users/login', { username: 'testuser1', password: 'testpassword1' });
    token = loginRes.data.response.data.accessToken;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log("Logged in");

    // Add recent search
    const addRes = await api.post('/users/recent-searches', {
        source: "NDLS - New Delhi",
        destination: "BCT - Mumbai Central",
        date: "2024-05-15"
    });
    console.log("Add response status:", addRes.status);
    console.log("Add response data:", addRes.data);

    const getRes = await api.get('/users/recent-searches');
    console.log("Get response:", getRes.data);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

test();
