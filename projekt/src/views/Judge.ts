import {Component, Vue} from 'vue-property-decorator';
import {JudgeService} from '@/services/judge-service';
@Component
export default class Judge extends Vue {
    public judges: Judge[] = [];
    public mounted() {
        JudgeService.getAll().then((res) => {
           this.judges = res.data;
        });
    }
}
