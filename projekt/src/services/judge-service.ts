import axios from 'axios';

export class JudgeService {
    public static getExternal() {
        return axios.get(`${process.env.VUE_APP_EXTERNAL_URL}/sedziowie`);
    }
    public static get(id: number) {
        return axios.get(`${process.env.VUE_APP_API_URL}/judge/${id}`);
    }
    public static getAll() {
        return axios.get(`${process.env.VUE_APP_API_URL}/judge`);
    }
}
