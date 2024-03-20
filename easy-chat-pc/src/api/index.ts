import axios from 'axios';
import { CResponse } from '../../../easy-chat-common/index'
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_DEV,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use((config)=>{
    return config
}, error => {
    return Promise.reject(error);
  })

instance.interceptors.response.use((response)=>{
  console.log(CResponse.success(response),'=====>CResponse')
    return response
}, error => {
    return Promise.reject(error);
  })
export default instance;