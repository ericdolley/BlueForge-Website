import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: APIURL,
  timeout: 20000
});

export default API;
