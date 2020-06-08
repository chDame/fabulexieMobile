import axios from 'axios';
import {BACKEND} from 'react-native-dotenv';

const api = axios.create({
  //baseURL: `${BACKEND}`,
  baseURL: 'https://042168a488d5.ngrok.io'
});

export default api;