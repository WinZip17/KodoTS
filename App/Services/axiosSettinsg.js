import axios from 'axios';

const API_HOST = 'https://kodo-rs.6rs.ru';

const client = axios.create({
  baseURL: API_HOST + '/mapi/v1',
  responseType: 'json',
  withCredentials: true,
});

export default client;
