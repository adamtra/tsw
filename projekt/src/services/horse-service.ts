import axios from 'axios';

export class HorseService {
    public static getExternal() {
        return axios.get(`${process.env.VUE_APP_EXTERNAL_URL}/konie`);
    }
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse`);
    }
}
