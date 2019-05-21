import axios from 'axios';
import store from '@/store/';

export function setup() {
    axios.interceptors.request.use((config) => {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
}
