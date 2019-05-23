import {Component, Vue} from 'vue-property-decorator';
import {HorseService} from '@/services/horse-service';
import DataTable from '@/components/DataTable';
import UiLoader from '@/components/UiLoader';
@Component({
    components: {
        DataTable,
        UiLoader,
    },
})
export default class Horse extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Nazwa', value: 'nazwa' },
        { text: 'Maść', value: 'masc' },
        { text: 'Kraj', value: 'kraj' },
        { text: 'Rocznik', value: 'rocznik' },
        { text: 'Opcje', value: 'opcje' },
    ];
    public title = 'Konie';
    public horses: Horse[] = [];
    public loading = true;
    public mounted() {
        this.getHorses();
    }
    public getHorses() {
        this.loading = true;
        HorseService.getAll().then((res) => {
            this.horses = res.data;
            this.loading = false;
        });
    }
}
