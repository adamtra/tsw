import axios from 'axios';
import Horse from '@/types/horse';
import {apiUrl} from '@/variables';


export class HorseService {
    public static get(id: number) {
        return axios.get(`${apiUrl}/horse/${id}`);
    }
    public static getAll() {
        return axios.get(`${apiUrl}/horse`);
    }
    public static add(data: Horse) {
        return axios.post(`${apiUrl}/horse/`, data);
    }
    public static edit(data: Horse) {
        return axios.put(`${apiUrl}/horse/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${apiUrl}/horse/${id}`);
    }
}
