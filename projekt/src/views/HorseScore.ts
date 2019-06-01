import {Component, Vue} from 'vue-property-decorator';
import UiLoader from '@/components/UiLoader';
import {ClassService} from '@/services/class-service';
import ScoreInput from '@/components/ScoreInput';
import Class from '@/types/class';
import {HorseService} from '@/services/horse-service';
import router from '@/router';

@Component({
    components: {
        UiLoader,
        ScoreInput,
    },
})
export default class HorseScore extends Vue {
    public loading = false;
    public scoreData: Class = {} as Class;
    public saving = false;
    public errors: number[] = [];
    public created() {
        this.getData();
    }

    public getData() {
        this.loading = true;
        ClassService.getHorseScore(Number(this.$route.params.id), Number(this.$route.params.hid)).then((res) => {
            this.scoreData = res.data;
            if (this.scoreData.horse) {
                for (const i of this.scoreData.horse.wynik.noty) {
                    for (let j = 0; j < 5; j++) {
                        this.errors.push(0);
                    }
                }
            }
            this.loading = false;
        }, () => {
            router.push(`/classes/${this.$route.params.id}`);
        });
    }

    public updateValue(row: number, col: string, value: number) {
        if (this.scoreData.horse) {
            let colIndex = 0;
            switch (col) {
                case 'typ':
                    colIndex = 0;
                    break;
                case 'glowa':
                    colIndex = 1;
                    break;
                case 'kloda':
                    colIndex = 2;
                    break;
                case 'nogi':
                    colIndex = 3;
                    break;
                case 'ruch':
                    colIndex = 4;
                    break;
            }
            if (value < 0 || value > 20) {
                this.errors[row * colIndex] = 1;
            } else if (value * 10 % 5 !== 0) {
                this.errors[row * colIndex] = 1;
            } else {
                this.errors[row * colIndex] = 0;
            }
            Vue.set(this.scoreData.horse.wynik.noty[row], col, value);
        }
    }

    public saveScore() {
        if (this.scoreData.horse) {
            this.saving = true;
            this.scoreData.horse.wynik.oceniono = true;
            HorseService.edit(this.scoreData.horse).then(() => {
                this.saving = false;
                router.push(`/classes/${this.$route.params.id}`);
            }, () => {
                this.saving = false;
            });
        }
    }
}
