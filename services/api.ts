import axios from 'axios';
import {BACKEND} from 'react-native-dotenv';

const api = axios.create({
  //baseURL: `${BACKEND}`,
  baseURL: 'https://6d865fcb4492.ngrok.io'
});

export default api;
