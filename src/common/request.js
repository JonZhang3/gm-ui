import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:58080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

export default axios;
