import axios from 'axios';

const instance = axios.create({
  baseURL: `https://react-my-burger-app-64f35.firebaseio.com/`
});

export default instance;