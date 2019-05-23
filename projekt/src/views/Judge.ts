import {Component, Vue} from 'vue-property-decorator';
import {JudgeService} from '@/services/judge-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
@Component({
    name: 'Judge',
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
        ];
    public title = 'Sędziowie';
    public loading = true;
    public mounted() {
        JudgeService.getAll().then((res) => {
            this.loading = true;
            this.judges = res.data;
        });
    }
}
