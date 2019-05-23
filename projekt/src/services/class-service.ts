import axios from 'axios';

export class ClassService {
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/class/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/class`);
    }
}
