import {Component, Vue} from 'vue-property-decorator';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
@Component({
    components: {
        DataTable,
        UiLoader,
    },
})
export default class Class extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Kategoria', value: 'kat' },
        { text: 'Opcje', value: 'opcje' },
    ];
    public title = 'Klasy';
    public classes: Class[] = [];
    public loading = true;
    public mounted() {
        this.getClasses();
    }
    public getClasses() {
        this.loading = true;
        ClassService.getAll().then((res) => {
            this.classes = res.data;
            this.loading = false;
        });
    }
}
