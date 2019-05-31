import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import {JudgeService} from '@/services/judge-service';
import Judge from '@/types/judge';
import UiLoader from '@/components/UiLoader';
import router from '@/router';

@Component({
    components: {
      UiLoader,
    },
})
export default class JudgeDetails extends Vue {
    public $route!: Route;
    public judgeData = {} as Judge;
    public loading = false;
    public saving = false;
    public deleting = false;
    public isNew = true;
    public valid = false;
    public emptyRules = [
        (v: any) => !!v || 'Pole nie może być puste',
    ];
    public created() {
        this.getDetails();
    }

    public getDetails() {
        if (this.$route.params.id !== 'new') {
            this.isNew = false;
            this.loading = true;
            JudgeService.get(Number(this.$route.params.id)).then((res) => {
                this.judgeData = res.data;
                this.loading = false;
            });
        }
    }

    public save() {
        if (this.valid) {
            this.saving = true;
            if (this.isNew) {
                JudgeService.add(this.judgeData).then(() => {
                    router.push('/judges');
                }, () => {
                    this.saving = false;
                });
            } else {
                JudgeService.edit(this.judgeData).then(() => {
                    router.push('/judges');
                }, () => {
                    this.saving = false;
                });
            }
        }
    }

    public remove() {
        this.deleting = true;
        JudgeService.delete(this.judgeData.id).then(() => {
            router.push('/judges');
        }, () => {
            this.deleting = false;
        });
    }
}
