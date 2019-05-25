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

const validations = {
    classData: {
        numer: {required, numeric},
        kat: {required},
        komisja: {required},
        czempionat: {required},
    },
};
@Component({
    components: {
        UiLoader,
        DataTable,
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
        {text: 'Ocena', value: 'ocena'},
    ];
    public judges: Judge[] = [];
    public classes: Class[] = [];

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
        if (this.$v.classData) {
            if (!this.$v.classData.$invalid) {
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
    }

    public remove() {
        this.deleting = true;
        ClassService.delete(this.classData.id).then(() => {
            router.push('/classes');
        }, () => {
            this.deleting = false;
        });
    }

    private checkError(field: string) {
        const errors: string[] = [];
        // @ts-ignore
        if (this.$v.classData && this.$v.classData[field]) {
            // @ts-ignore
            if (!this.$v.classData[field].$invalid) {
                return errors;
            } else {
                // @ts-ignore
                if (this.$v.classData[field].hasOwnProperty('numeric') && !this.$v.classData[field].numeric) {
                    errors.push('Pole musi być liczbą');
                }
                // @ts-ignore
                if (this.$v.classData[field].hasOwnProperty('required') && !this.$v.classData[field].required) {
                    errors.push('Pole nie może być puste');
                }
            }
        }
        return errors;
    }
}
