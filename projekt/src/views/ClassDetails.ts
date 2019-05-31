import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import Class from '@/types/class';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
import router from '@/router';
import {validationMixin} from 'vuelidate';
import {required, numeric} from 'vuelidate/lib/validators';
import Judge from '@/types/judge';
import {JudgeService} from '@/services/judge-service';
import ClassScore from '@/components/ClassScore';

const validations = {
    classData: {
        numer: {required, numeric},
        kat: {required},
        komisja: {required},
        // czempionat: {required},
    },
};
@Component({
    components: {
        UiLoader,
        DataTable,
        ClassScore,
    },
    mixins: [validationMixin],
    validations,
})
export default class ClassDetails extends Vue {
    public $route!: Route;
    public classData = {} as Class;
    public loading = false;
    public saving = false;
    public deleting = false;
    public isNew = true;
    public headers = [
        {text: 'Numer', value: 'numer'},
        {text: 'Nazwa', value: 'nazwa'},
        {text: 'Maść', value: 'masc'},
        {text: 'Kraj', value: 'kraj'},
        {text: 'Rocznik', value: 'rocznik'},
        {text: 'Oceniono', value: 'oceniono'},
        {text: 'Ocena', value: 'ocena'},
    ];
    public judges: Judge[] = [];
    public classes: Class[] = [];
    public valid = false;
    public emptyRules = [
        (v: any) => !!v || 'Pole nie może być puste',
    ];
    public numberRules = [
        (v: any) => !!v || 'Pole nie może być puste',
        (v: any) => Number.isInteger(v) || 'Pole musi być liczbą',
    ];

    public created() {
        this.getDetails();
        JudgeService.getAll().then((res) => {
            this.judges = res.data;
        });
        ClassService.getOpenedChampion().then((res) => {
            this.classes = res.data;
        });
    }

    public getDetails() {
        if (this.$route.params.id !== 'new') {
            this.isNew = false;
            this.loading = true;
            ClassService.get(Number(this.$route.params.id)).then((res) => {
                this.classData = res.data;
                this.loading = false;
            });
        }
    }

    public save() {
        if (this.valid) {
            this.saving = true;
            if (this.isNew) {
                ClassService.add(this.classData).then(() => {
                    router.push('/classes');
                }, () => {
                    this.saving = false;
                });
            } else {
                ClassService.edit(this.classData).then(() => {
                    router.push('/classes');
                }, () => {
                    this.saving = false;
                });
            }
        }
    }

    public remove() {
        this.deleting = true;
        ClassService.delete(this.classData.id).then(() => {
            router.push('/classes');
        }, () => {
            this.deleting = false;
        });
    }
}
