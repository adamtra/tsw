import axios from 'axios';
import User from '@/types/user';

export class UserService {
    public static login(data: User) {
        return axios.post(`${process.env.VUE_APP_API_URL}/user/login`, data);
    }
    public static checkToken(token: string) {
        return axios.get(`${process.env.VUE_APP_API_URL}/user/check/${token}`);
    }
}
