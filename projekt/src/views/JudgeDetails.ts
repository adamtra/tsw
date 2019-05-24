import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import {JudgeService} from '@/services/judge-service';
import Judge from '@/types/judge';
import UiLoader from '@/components/UiLoader';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';

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
    public $route!: Route;
    public judgeData!: Judge;
    public loading = true;
    public saving = false;
    public created() {
        this.getDetails();
    }

    public getDetails() {
        this.loading = true;
        JudgeService.get(Number(this.$route.params.id)).then((res) => {
            this.judgeData = res.data;
            this.loading = false;
        });
    }

    get sedziaErrors() {
        // console.log(this.$v);
        const errors: string[] = [];
        // if (this.$v.judgeData.sedzia) {
        //     console.log(this.$v.judgeData.sedzia);
        //     if (!this.$v.judgeData.sedzia.$invalid) {
        //         return errors;
        //     } else {
        //         errors.push('Pole nie może być puste');
        //     }
        // }
        return errors;
    }

    public save() {
        console.log(this.$v);
        console.log(this.judgeData);
    }
}
