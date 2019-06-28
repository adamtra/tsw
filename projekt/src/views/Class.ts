import {Component, Vue} from 'vue-property-decorator';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
import ImportButton from '@/components/ImportButton';
import NewShowButton from '@/components/NewShowButton';
@Component({
    components: {
        DataTable,
        UiLoader,
        ImportButton,
        NewShowButton,
    },
})
export default class Class extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Kategoria', value: 'kat' },
        { text: 'Opcje', value: 'opcje_klasa' },
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
        this.$swal({
            title: 'Czy napewno chcesz usunąć klasę?',
            text: 'Ta operacja usunie powiązane konie.',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Yes, usuń',
            showCancelButton: true,
        }).then((confirm: any) => {
            if (confirm.value) {
                ClassService.delete(id).then(() => {
                   this.getClasses();
                });
            }
        });
    }
}
