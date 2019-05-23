import axios from 'axios';

export class HorseService {
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/horse`);
    }
}
