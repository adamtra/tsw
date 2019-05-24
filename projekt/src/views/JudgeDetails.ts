import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import {JudgeService} from '@/services/judge-service';
import Judge from '@/types/judge';
import UiLoader from '@/components/UiLoader';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';
import router from '@/router';

const validations = {
    judgeData: {
        sedzia: {required},
        kraj: {required},
    },
};

@Component({
    components: {
      UiLoader,
    },
    mixins: [validationMixin],
    validations,
})
export default class JudgeDetails extends Vue {

    get sedziaErrors() {
        const errors: string[] = [];
        if (this.$v.judgeData && this.$v.judgeData.sedzia) {
            if (!this.$v.judgeData.sedzia.$invalid) {
                return errors;
            } else {
                errors.push('Pole nie może być puste');
            }
        }
        return errors;
    }

    get krajErrors() {
        const errors: string[] = [];
        if (this.$v.judgeData && this.$v.judgeData.kraj) {
            if (!this.$v.judgeData.kraj.$invalid) {
                return errors;
            } else {
                errors.push('Pole nie może być puste');
            }
        }
        return errors;
    }
    public $route!: Route;
    public judgeData = {} as Judge;
    public loading = false;
    public saving = false;
    public deleting = false;
    public isNew = true;
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
        if (this.$v.judgeData) {
            if (!this.$v.judgeData.$invalid) {
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
