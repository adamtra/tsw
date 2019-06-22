import axios from 'axios';
import Class from '@/types/class';
import {apiUrl} from '@/variables';

export class ClassService {
    public static get(id: number) {
        return axios.get(`${apiUrl}/class/${id}`);
    }
    public static getOpened() {
        return axios.get(`${apiUrl}/class/opened`);
    }
    public static getOpenedChampion() {
        return axios.get(`${apiUrl}/class/opened/champion`);
    }
    public static getAll() {
        return axios.get(`${apiUrl}/class`);
    }
    public static getHorseScore(id: number, hid: number) {
        return axios.get(`${apiUrl}/class/${id}/horse/${hid}`);
    }
    public static add(data: Class) {
        return axios.post(`${apiUrl}/class/`, data);
    }
    public static edit(data: Class) {
        return axios.put(`${apiUrl}/class/${data.id}`, data);
    }
    public static delete(id: number) {
        return axios.delete(`${apiUrl}/class/${id}`);
    }
}
