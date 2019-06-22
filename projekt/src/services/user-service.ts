import axios from 'axios';
import User from '@/types/user';
import {apiUrl} from '@/variables';

export class UserService {
    public static login(data: User) {
        return axios.post(`${apiUrl}/user/login`, data);
    }
    public static checkToken() {
        return axios.get(`${apiUrl}/user/check`);
    }
    public static logout() {
        return axios.post(`${apiUrl}/user/logout`);
    }
}
