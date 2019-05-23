import {Component, Vue} from 'vue-property-decorator';
import {HorseService} from '@/services/horse-service';
import DataTable from '@/components/DataTable';
@Component({
    components: {
        DataTable,
    },
})
export default class Horse extends Vue {
    public headers = [
        { text: 'Numer', value: 'numer' },
        { text: 'Nazwa', value: 'nazwa' },
        { text: 'Kraj', value: 'kraj' },
        { text: 'Rocznik', value: 'rocznik' },
    ];
    public title = 'Konie';
    public horses: Horse[] = [];
    public mounted() {
        HorseService.getAll().then((res) => {
           this.horses = res.data;
        });
    }
}
