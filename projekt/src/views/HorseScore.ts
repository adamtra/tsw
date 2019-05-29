import {Component, Vue} from 'vue-property-decorator';
import UiLoader from '@/components/UiLoader';
import {ClassService} from '@/services/class-service';

@Component({
    components: {
        UiLoader,
    },
})
export default class HorseScore extends Vue {
    public loading = false;
    public scoreData = [];
    private width = 6;
    public created() {
        this.getData();
    }

    public getData() {
        this.loading = true;
        ClassService.getHorseScore(Number(this.$route.params.id), Number(this.$route.params.hid)).then((res) => {
            this.scoreData = res.data;
            this.loading = false;
        });
    }

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
}
