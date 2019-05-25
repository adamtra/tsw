import axios from 'axios';
import Horse from '@/types/horse';

export class HorseService {
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse`);
    }
    public static add(data: Horse) {
        return axios.post(`${process.env.VUE_APP_API_URL}/horse/`, data);
    }
    public static edit(data: Horse) {
        return axios.put(`${process.env.VUE_APP_API_URL}/horse/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${process.env.VUE_APP_API_URL}/horse/${id}`);
    }
}
