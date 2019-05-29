import {Component, Prop, Vue} from 'vue-property-decorator';
import Note from '@/types/note';

@Component
export default class ClassScore extends Vue {
    @Prop() public horses: any;
    public created() {
        this.calculateScore();
    }
    get rankedHorses() {
        return this.horses.filter((horse: any) => {
            return horse.wynik.oceniono;
        });
    }
    private calculateScore() {
        this.horses.forEach((horse: any) => {
            let score = 0;
            let typSum = 0;
            let ruchSum = 0;
            horse.wynik.noty.forEach((wynik: Note) => {
                score += wynik.typ;
                score += wynik.glowa;
                score += wynik.kloda;
                score += wynik.nogi;
                score += wynik.ruch;
                typSum += wynik.typ;
                ruchSum += wynik.ruch;
            });
            horse.wynik.suma = score;
            horse.wynik.typSuma = typSum;
            horse.wynik.ruchSuma = ruchSum;
        });
        this.horses.sort((x: any, y: any) => {
            if (x.wynik.suma < y.wynik.suma) {
                return 1;
            } else if (x.wynik.suma > y.wynik.suma) {
                return -1;
            } else {
                if (x.wynik.typSuma < y.wynik.suma.typSuma) {
                    return 1;
                } else if (x.wynik.typSuma > y.wynik.suma.typSuma) {
                    return -1;
                } else {
                    if (x.wynik.ruchSuma < y.wynik.suma.ruchSuma) {
                        return 1;
                    } else if (x.wynik.ruchSuma > y.wynik.suma.ruchSuma) {
                        return -1;
                    } else {
                        if (x.wynik.hasOwnProperty('rozjemca') && y.wynik.hasOwnProperty('rozjemca')) {
                            if (x.wynik.rozjemca < y.wynik.suma.rozjemca) {
                                return 1;
                            } else if (x.wynik.rozjemca > y.wynik.suma.rozjemca) {
                                return -1;
                            }
                        }
                    }
                }
            }
            return 0;
        });
    }
}
