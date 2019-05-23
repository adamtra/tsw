import {Component, Vue} from 'vue-property-decorator';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
@Component({
    components: {
        DataTable,
    },
})
export default class Class extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Kategoria', value: 'kat' },
    ];
    public title = 'Klasy';
    public classes: Class[] = [];
    public mounted() {
        ClassService.getAll().then((res) => {
           this.classes = res.data;
        });
    }
}
