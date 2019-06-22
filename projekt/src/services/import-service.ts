import axios from 'axios';
import {apiUrl} from '@/variables';

export class ImportService {
    public static importData() {
        return axios.get(`${apiUrl}/import`);
    }
    public static newShow() {
        return axios.get(`${apiUrl}/new`);
    }
}
