import axios from 'axios';
import Judge from '@/types/judge';

export class JudgeService {
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/judge/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/judge`);
    }
    public static add(data: Judge) {
        return axios.post(`${process.env.VUE_APP_API_URL}/judge/`, data);
    }
    public static edit(data: Judge) {
        return axios.put(`${process.env.VUE_APP_API_URL}/judge/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${process.env.VUE_APP_API_URL}/judge/${id}`);
    }
}
