import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import {HorseService} from '@/services/horse-service';
import Horse from '@/types/horse';
import router from '@/router';
import {validationMixin} from 'vuelidate';
import {numeric, required} from 'vuelidate/lib/validators';

const validations = {
    horseData: {
        kraj: {required},
        masc: {required},
        nazwa: {required},
        numer: {required, numeric},
        plec: {required},
        rocznik: {required, numeric},
        klasa: {required, numeric},
        hodowca: {
            nazwa: {required},
            kraj: {required},
        },
        rodowod: {
            m: {
                nazwa: {required},
                kraj: {required},
            },
            o: {
                nazwa: {required},
                kraj: {required},
            },
            om: {
                nazwa: {required},
                kraj: {required},
            },
        },
        wlasciciel: {
            nazwa: {required},
            kraj: {required},
        },
    },
};

@Component({
    components: {
      UiLoader,
    },
    mixins: [validationMixin],
    validations,
})
export default class HorseDetails extends Vue {
    public $route!: Route;
    public horseData = {} as Horse;
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
            HorseService.get(Number(this.$route.params.id)).then((res) => {
                this.horseData = res.data;
                this.loading = false;
            });
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

    private checkError(field: string) {
        const errors: string[] = [];
        // @ts-ignore
        if (this.$v.horseData && this.$v.horseData[field]) {
            // @ts-ignore
            if (!this.$v.horseData[field].$invalid) {
                return errors;
            } else {
                // @ts-ignore
                if (this.$v.horseData[field].hasOwnProperty('numeric') && !this.$v.horseData[field].numeric) {
                    errors.push('Pole musi być liczbą');
                }
                // @ts-ignore
                if (this.$v.horseData[field].hasOwnProperty('required') && !this.$v.horseData[field].required) {
                    errors.push('Pole nie może być puste');
                }
            }
        }
        return errors;
    }

    private checkError2Level(field: string, field2: string) {
        const errors: string[] = [];
        // @ts-ignore
        if (this.$v.horseData && this.$v.horseData[field][field2]) {
            // @ts-ignore
            if (!this.$v.horseData[field][field2].$invalid) {
                return errors;
            } else {
                // @ts-ignore
                if (this.$v.horseData[field][field2].hasOwnProperty('numeric') && !this.$v.horseData[field][field2].numeric) {
                    errors.push('Pole musi być liczbą');
                }
                // @ts-ignore
                if (this.$v.horseData[field][field2].hasOwnProperty('required') && !this.$v.horseData[field][field2].required) {
                    errors.push('Pole nie może być puste');
                }
            }
        }
        return errors;
    }

    private checkError3Level(field: string, field2: string, field3: string) {
        const errors: string[] = [];
        // @ts-ignore
        if (this.$v.horseData && this.$v.horseData[field][field2][field3]) {
            // @ts-ignore
            if (!this.$v.horseData[field][field2][field3].$invalid) {
                return errors;
            } else {
                // @ts-ignore
                if (this.$v.horseData[field][field2][field3].hasOwnProperty('numeric') && !this.$v.horseData[field][field2][field3].numeric) {
                    errors.push('Pole musi być liczbą');
                }
                // @ts-ignore
                if (this.$v.horseData[field][field2][field3].hasOwnProperty('required') && !this.$v.horseData[field][field2][field3].required) {
                    errors.push('Pole nie może być puste');
                }
            }
        }
        return errors;
    }
}
