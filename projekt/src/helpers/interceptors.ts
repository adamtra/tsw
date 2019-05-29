import axios from 'axios';
import store from '@/store/';
import {Vue} from 'vue-property-decorator';
import router from '@/router';

export function token() {
    axios.interceptors.request.use((config) => {
        const auth = store.getters.token;
        if (auth) {
            config.headers.Authorization = `Bearer ${auth}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
}

export function errors() {
    axios.interceptors.response.use((res) => {
        return res;
    }, (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 404) {
                Vue.swal({
                    title: 'Nie znaleziono',
                    type: 'error',
                    showConfirmButton: false,
                }).then(() => {
                    router.push('/');
                });
            } else if (status === 500) {
                Vue.swal({
                    title: 'Coś poszło nie tak',
                    type: 'error',
                    showConfirmButton: false,
                });
            } else if (status === 501) {
                Vue.swal({
                    title: 'Metoda nie jest obsługiwana',
                    type: 'error',
                    showConfirmButton: false,
                });
            } else if (status === 400) {
                Vue.swal({
                    title: error.response.data,
                    type: 'error',
                    showConfirmButton: false,
                });
            } else if (status === 401) {
                Vue.swal({
                    title: 'Zły login lub hasło',
                    type: 'error',
                    showConfirmButton: false,
                });
            } else if (status === 403) {
                Vue.swal({
                    title: 'Brak dostępu',
                    type: 'error',
                    showConfirmButton: false,
                }).then(() => {
                    store.dispatch('deleteToken');
                    router.push('/');
                    window.location.reload();
                });
            }
        }
        return Promise.reject(error);
    });
}
