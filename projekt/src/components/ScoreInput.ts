import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ScoreInput extends Vue {
    @Prop() public score: any;
    @Prop() public row: any;
    @Prop() public column: any;
    @Prop({
        default: false,
    }) public disabled: any;
    public error: string[] = [];
    private width = 6;
    public nextRow(row: number, col: number, event: KeyboardEvent) {
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            const cells = document.querySelectorAll('td');
            const rows = cells.length / this.width;
            if (row === 0) {
                if (col === 0) {
                    col = this.width - 2;
                } else {
                    col--;
                }
                row = rows - 1;
            } else {
                row--;
            }
            const key = this.width * row + col;
            let input = cells[key];
            for (let i = 0; i < 5; i++) {
                if (input.firstElementChild) {
                    // @ts-ignore
                    input = input.firstElementChild;
                }
            }
            input.focus();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            const cells = document.querySelectorAll('td');
            const rows = cells.length / this.width;
            if (row + 1 === rows) {
                if (col + 1 === this.width - 1) {
                    col = 0;
                } else {
                    col++;
                }
                row = 0;
            } else {
                row++;
            }
            const key = this.width * row + col;
            let input = cells[key];
            for (let i = 0; i < 5; i++) {
                if (input.firstElementChild) {
                    // @ts-ignore
                    input = input.firstElementChild;
                }
            }
            input.focus();
        }
    }
    get scoreValue() {
        return this.score;
    }

    set scoreValue(value) {
        value = Number.parseFloat(value);
        const error = this.checkScore(value);
        if (error !== '') {
            this.error.push(error);
        } else {
            this.error = [];
        }
        this.$emit('input', value);
    }

    private checkScore(score: number) {
        if (score < 0 || score > 20) {
            return 'Wynik musi być z zakresu 0 - 20';
        }
        if (score * 10 % 5 !== 0) {
            return 'Wynik musi być z krokiem 0.5';
        }
        return '';
    }
}
