const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Attempting login via Axios to http://localhost:5000/api/auth/login');
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'professorshyam123@gmail.com',
            password: '12345678'
        });
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
};

testLogin();
