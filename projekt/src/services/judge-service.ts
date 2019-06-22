import axios from 'axios';
import Judge from '@/types/judge';
import {apiUrl} from '@/variables';

export class JudgeService {
    public static get(id: number) {
        return axios.get(`${apiUrl}/judge/${id}`);
    }
    public static getAll() {
        return axios.get(`${apiUrl}/judge`);
    }
    public static add(data: Judge) {
        return axios.post(`${apiUrl}/judge/`, data);
    }
    public static edit(data: Judge) {
        return axios.put(`${apiUrl}/judge/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${apiUrl}/judge/${id}`);
    }
}
