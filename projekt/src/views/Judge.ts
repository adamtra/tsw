import {Component, Vue} from 'vue-property-decorator';
import {JudgeService} from '@/services/judge-service';
import DataTable from '@/components/DataTable';
@Component({
    name: 'Judge',
    components: {
        DataTable,
    },
})
export default class Judge extends Vue {
    public judges: Judge[] = [];
    public headers = [
        { text: 'Imię i nazwisko', value: 'sedzia' },
        { text: 'Kraj', value: 'kraj' },
        ];
    public title = 'Sędziowie';
    public mounted() {
        JudgeService.getAll().then((res) => {
           this.judges = res.data;
        });
    }
}
