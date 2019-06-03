import {Component, Vue} from 'vue-property-decorator';
import {HorseService} from '@/services/horse-service';
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
export default class Horse extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Nazwa', value: 'nazwa' },
        { text: 'Maść', value: 'masc' },
        { text: 'Kraj', value: 'kraj' },
        { text: 'Rocznik', value: 'rocznik' },
        { text: 'Opcje', value: 'opcje_kon' },
    ];
    public title = 'Konie';
    public horses: Horse[] = [];
    public loading = true;
    public created() {
        this.getHorses();
    }
    public getHorses() {
        this.loading = true;
        HorseService.getAll().then((res) => {
            this.horses = res.data;
            this.loading = false;
        });
    }

    public remove(id: number) {
        HorseService.delete(id).then(() => {
            this.getHorses();
        });
    }

    public imported() {
        this.getHorses();
    }
}
