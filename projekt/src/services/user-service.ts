import axios from 'axios';
import User from '@/types/user';

export class UserService {
    public static login(data: User) {
        return axios.post(`${process.env.VUE_APP_API_URL}/user/login`, data);
    }
    public static checkToken() {
        return axios.get(`${process.env.VUE_APP_API_URL}/user/check`);
    }
    public static logout() {
        return axios.post(`${process.env.VUE_APP_API_URL}/user/logout`);
    }
}
