import {Component, Vue} from 'vue-property-decorator';
import {HorseService} from '@/services/horse-service';
@Component
export default class Horse extends Vue {
    public horses: Horse[] = [];
    public mounted() {
        HorseService.getAll().then((res) => {
           this.horses = res.data;
        });
    }
}
