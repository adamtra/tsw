import axios from 'axios';

export class ClassService {
    public static getExternal() {
        return axios.get(`${process.env.VUE_APP_EXTERNAL_URL}/klasy`);
    }
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/class/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/class`);
    }
}
