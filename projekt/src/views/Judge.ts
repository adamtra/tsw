import {Component, Vue} from 'vue-property-decorator';
import {JudgeService} from '@/services/judge-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
@Component({
    components: {
        DataTable,
        UiLoader,
    },
})
export default class Judge extends Vue {
    public judges: Judge[] = [];
    public headers = [
        { text: 'Imię i nazwisko', value: 'sedzia' },
        { text: 'Kraj', value: 'kraj' },
        { text: 'Opcje', value: 'opcje' },
        ];
    public title = 'Sędziowie';
    public loading = true;
    public mounted() {
        this.getJudges();
    }

    public getJudges() {
        this.loading = true;
        JudgeService.getAll().then((res) => {
            this.loading = false;
            this.judges = res.data;
        });
    }

    public remove(id: number) {
        JudgeService.delete(id).then(() => {
           this.getJudges();
        });
    }
}
