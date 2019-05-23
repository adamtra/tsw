import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import {JudgeService} from '@/services/judge-service';
import Judge from '@/types/judge';
import UiLoader from '@/components/UiLoader';

@Component({
    components: {
      UiLoader,
    },
})
export default class JudgeDetails extends Vue {
    public $route!: Route;
    public judgeData!: Judge;
    public loading = true;
    public mounted() {
        this.getDetails();
    }

    public getDetails() {
        this.loading = true;
        JudgeService.get(Number(this.$route.params.id)).then((res) => {
            this.judgeData = res.data;
            this.loading = false;
        });
    }
}
