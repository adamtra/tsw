import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import Class from '@/types/class';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';
import router from '@/router';
import Judge from '@/types/judge';
import {JudgeService} from '@/services/judge-service';
import ClassScore from '@/components/ClassScore';

@Component({
    components: {
        UiLoader,
        DataTable,
        ClassScore,
    },
})
export default class ClassDetails extends Vue {
    public $route!: Route;
    public classData = {} as Class;
    public loading = false;
    public saving = false;
    public closing = false;
    public deleting = false;
    public isNew = true;
    public headers: any = [];
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
    public emptyArrayRules = [
        (v: any) => v.length > 0 || 'Lista nie może być pusta',
    ];
    public isChampion = false;

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
                if (this.classData.zamknieta) {
                    this.headers = [
                        {text: 'Numer', value: 'numer'},
                        {text: 'Nazwa', value: 'nazwa'},
                        {text: 'Maść', value: 'masc'},
                        {text: 'Kraj', value: 'kraj'},
                        {text: 'Rocznik', value: 'rocznik'},
                    ];
                } else {
                    this.headers = [
                        {text: 'Numer', value: 'numer'},
                        {text: 'Nazwa', value: 'nazwa'},
                        {text: 'Maść', value: 'masc'},
                        {text: 'Kraj', value: 'kraj'},
                        {text: 'Rocznik', value: 'rocznik'},
                        {text: 'Oceniono', value: 'oceniono'},
                        {text: 'Ocena', value: 'ocena'},
                    ];
                }
                this.loading = false;
            });
        }
    }

    public save() {
        if (this.valid) {
            this.saving = true;
            if (this.isNew) {
                this.classData.zamknieta = false;
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

    public closeClass() {
        if (this.valid) {
            this.closing = true;
            this.classData.zamknieta = true;
            ClassService.edit(this.classData).then(() => {
                router.push('/classes');
            }, () => {
                this.closing = false;
            });
        }
    }

    public changeType() {
        if (this.isChampion) {
            delete this.classData.czempionat;
            this.classData.komisja = [];
            this.judges.forEach((judge) => {
                this.classData.komisja.push(judge.id);
            });
        }
    }
}
