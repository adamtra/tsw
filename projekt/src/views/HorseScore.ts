import {Component, Vue} from 'vue-property-decorator';
import UiLoader from '@/components/UiLoader';
import {ClassService} from '@/services/class-service';

@Component({
    components: {
        UiLoader,
    },
})
export default class HorseScore extends Vue {
    public loading = false;
    public scoreData = [];
    public created() {
        this.getData();
    }

    public getData() {
        this.loading = true;
        ClassService.getHorseScore(Number(this.$route.params.id), Number(this.$route.params.hid)).then((res) => {
            this.scoreData = res.data;
            this.loading = false;
        });
    }
}
