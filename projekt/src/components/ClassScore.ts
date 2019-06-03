import {Component, Prop, Vue} from 'vue-property-decorator';
import Note from '@/types/note';

@Component
export default class ClassScore extends Vue {
    get rankedHorses() {
        this.calculateScore();
        return this.horses.filter((horse: any) => {
            return horse.wynik.oceniono;
        });
    }
    @Prop() public horses: any;
    @Prop({
        default: false,
    }) public editable: any;

    public arbitrator() {
        this.calculateScore();
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
                if (x.wynik.typSuma < y.wynik.typSuma) {
                    return 1;
                } else if (x.wynik.typSuma > y.wynik.typSuma) {
                    return -1;
                } else {
                    if (x.wynik.ruchSuma < y.wynik.ruchSuma) {
                        return 1;
                    } else if (x.wynik.ruchSuma > y.wynik.ruchSuma) {
                        return -1;
                    } else {
                        if (x.wynik.hasOwnProperty('rozjemca') && y.wynik.hasOwnProperty('rozjemca')) {
                            if (x.wynik.rozjemca < y.wynik.rozjemca) {
                                return 1;
                            } else if (x.wynik.rozjemca > y.wynik.rozjemca) {
                                return -1;
                            }
                        }
                    }
                }
            }
            x.wynik.draw = true;
            y.wynik.draw = true;
            return 0;
        });
    }
}
