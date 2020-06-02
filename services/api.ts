import axios from 'axios';
import {BACKEND} from 'react-native-dotenv';

const api = axios.create({
  baseURL: `${BACKEND}`,
});

export default api;
