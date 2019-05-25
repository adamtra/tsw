import {Component, Vue} from 'vue-property-decorator';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
import ImportButton from '@/components/ImportButton';
@Component({
    components: {
        DataTable,
        UiLoader,
        ImportButton,
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
    public created() {
        this.getClasses();
    }
    public getClasses() {
        this.loading = true;
        ClassService.getAll().then((res) => {
            this.classes = res.data;
            this.loading = false;
        });
    }

    public remove(id: number) {
        ClassService.delete(id).then(() => {
           this.getClasses();
        });
    }

    public imported() {
        this.getClasses();
    }
}
