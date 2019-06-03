import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import {HorseService} from '@/services/horse-service';
import Horse from '@/types/horse';
import router from '@/router';
import Class from '@/types/class';
import {ClassService} from '@/services/class-service';

@Component({
    components: {
        UiLoader,
    },
})
export default class HorseDetails extends Vue {
    public $route!: Route;
    public horseData = {} as Horse;
    public classes: Class[] = [];
    public loading = false;
    public saving = false;
    public deleting = false;
    public isNew = true;
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
    }

    public getDetails() {
        if (this.$route.params.id !== 'new') {
            this.isNew = false;
            this.loading = true;
            HorseService.get(Number(this.$route.params.id)).then((res) => {
                this.horseData = res.data;
                this.loading = false;
                if (this.horseData.wynik.oceniono) {
                    ClassService.getAll().then((res) => {
                        this.classes = res.data;
                    });
                } else {
                    ClassService.getOpened().then((res) => {
                        this.classes = res.data;
                    });
                }
            });
        } else {
            ClassService.getOpened().then((res) => {
                this.classes = res.data;
            });
            Object.assign(this.horseData, {
                hodowca: {},
                rodowod: {
                    m: {},
                    o: {},
                    om: {},
                },
                wlasciciel: {},
                wynik: {
                    oceniono: false,
                },
            });
        }
    }

    public save() {
        if (this.valid) {
            this.saving = true;
            if (this.isNew) {
                HorseService.add(this.horseData).then(() => {
                    router.push('/horses');
                }, () => {
                    this.saving = false;
                });
            } else {
                HorseService.edit(this.horseData).then(() => {
                    router.push('/horses');
                }, () => {
                    this.saving = false;
                });
            }
        }
    }

    public remove() {
        this.deleting = true;
        HorseService.delete(this.horseData.id).then(() => {
            router.push('/horses');
        }, () => {
            this.deleting = false;
        });
    }
}
