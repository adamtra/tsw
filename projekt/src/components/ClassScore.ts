import {Component, Prop, Vue} from 'vue-property-decorator';
import Note from '@/types/note';
import draggable from 'vuedraggable';
import {HorseService} from '@/services/horse-service';

@Component({
    components: {
        draggable,
    },
})
export default class ClassScore extends Vue {
    get rankedHorses() {
        this.calculateScore();
        return this.horses.filter((horse: any) => {
            return horse.wynik.oceniono;
        });
    }
    get hasDraw() {
        if (!this.championship) {
            return this.rankedHorses.filter((x: any) => x.wynik.draw).length > 0;
        } else {
            return this.rankedHorses.filter((x: any) => x.czempionat.draw).length > 0;
        }
    }
    get judgeScores() {
        if (this.championship) {
            let sum = 0;
            this.horses.forEach((horse: any) => {
                sum += horse.czempionat.wyniki.zloto.length;
                sum += horse.czempionat.wyniki.srebro.length;
                sum += horse.czempionat.wyniki.braz.length;
            });
            return sum === this.horses.length * 3;
        }
        return false;
    }
    get isChampionship() {
        return this.championship;
    }
    @Prop() public horses: any;
    @Prop({
        default: false,
    }) public editable: any;
    @Prop({
        default: false,
    }) public championship: any;
    public showDraws = false;
    public closing = false;
    public drawHorses: any = [];

    public endDrag(index: number) {
        let start: any;
        this.drawHorses[index].forEach((item: any) => {
            if (start === undefined || item.position < start) {
                start = item.position;
            }
        });
        this.drawHorses[index].forEach((item: any, key: number) => {
            const newPosition = start + key;
            item.position = newPosition;
            item.data.wynik.rozjemca = newPosition;
        });
    }

    public arbitrator() {
        this.$emit('block');
        this.showDraws = true;
        const drawGroups = [];
        let drawGroup = [];
        for (let i = 0; i < this.rankedHorses.length; i++) {
            if (this.rankedHorses[i].wynik.draw) {
                if (!(drawGroup.length === 0 || i - drawGroup[drawGroup.length - 1].position === 1)) {
                    drawGroups.push(drawGroup);
                    drawGroup = [];
                }
                drawGroup.push({
                    position: i,
                    data: this.rankedHorses[i],
                });
                delete this.horses[i].wynik.draw;
                this.horses[i].wynik.rozjemca = i;
            }
        }
        if (drawGroup.length > 0) {
            drawGroups.push(drawGroup);
        }
        this.drawHorses = drawGroups;
    }

    public closeClass() {
        this.closing = true;
        this.drawHorses.forEach((group: any) => {
           group.forEach((horse: any) => {
               HorseService.edit(horse.data);
           });
        });
        this.$emit('closed');
    }
    private calculateStandard() {
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
            delete horse.wynik.draw;
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
                                return -1;
                            } else if (x.wynik.rozjemca > y.wynik.rozjemca) {
                                return 1;
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
    private calculateChampionship() {
        this.horses.forEach((horse: any) => {
            let score = 0;
            score += horse.czempionat.wyniki.zloto.length * 4;
            score += horse.czempionat.wyniki.srebro.length * 2;
            score += horse.czempionat.wyniki.braz.length;
            horse.czempionat.suma = score;
            delete horse.czempionat.draw;
        });
        this.horses.sort((x: any, y: any) => {
            if (x.czempionat.suma < y.czempionat.suma) {
                return 1;
            } else if (x.czempionat.suma > y.czempionat.suma) {
                return -1;
            }
            x.czempionat.draw = true;
            y.czempionat.draw = true;
            return 0;
        });
    }
    private calculateScore() {
        if (!this.championship) {
            this.calculateStandard();
        } else {
            this.calculateChampionship();
        }
    }
}
