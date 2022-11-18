import axios from "axios";
import qs from 'querystring';

// axios.defaults.baseURL = 'http://127.0.0.1:58080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

const request = {

    get: axios.get,

    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data)).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        });
    },

    put: axios.put,

    delete: axios.delete,

}

export default request;
