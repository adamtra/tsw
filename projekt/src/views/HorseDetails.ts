import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import {HorseService} from '@/services/horse-service';
import Horse from '@/types/horse';

@Component({
    components: {
      UiLoader,
    },
})
export default class HorseDetails extends Vue {
    public $route!: Route;
    public horseData!: Horse;
    public loading = true;
    public mounted() {
        this.getDetails();
    }

    public getDetails() {
        this.loading = true;
        HorseService.get(Number(this.$route.params.id)).then((res) => {
            this.horseData = res.data;
            this.loading = false;
        });
    }
}
