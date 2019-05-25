import axios from 'axios';
import Class from '@/types/class';

export class ClassService {
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/class/${id}`);
    }
    public static getOpened() {
        return axios.get(`${process.env.VUE_APP_API_URL}/class/opened`);
    }
    public static getOpenedChampion() {
        return axios.get(`${process.env.VUE_APP_API_URL}/class/opened/champion`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/class`);
    }
    public static add(data: Class) {
        return axios.post(`${process.env.VUE_APP_API_URL}/class/`, data);
    }
    public static edit(data: Class) {
        return axios.put(`${process.env.VUE_APP_API_URL}/class/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${process.env.VUE_APP_API_URL}/class/${id}`);
    }
}
