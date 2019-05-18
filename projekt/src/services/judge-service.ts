import axios from 'axios';

export class JudgeService {
    public static get() {
        return axios.get('http://localhost:3000/sedziowie');
    }
}
