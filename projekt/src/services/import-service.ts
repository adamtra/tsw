import axios from 'axios';

export class ImportService {
    public static importData() {
        return axios.get(`${process.env.VUE_APP_API_URL}/import`);
    }
}
