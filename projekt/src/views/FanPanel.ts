import {Component, Vue} from 'vue-property-decorator';
import Class from '@/types/class';
import ClassScore from '@/components/ClassScore';
import Horse from '@/views/Horse';

@Component({
    components: {
        ClassScore,
    },
    sockets: {
        classes(data: Class[]) {
            // @ts-ignore
            const selected = this.selected;
            let selectedClass: any;
            if (selected !== null) {
                // @ts-ignore
                selectedClass = this.results[selected];
            }
            // @ts-ignore
            this.results = data;
            if (selectedClass) {
                // @ts-ignore
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === selectedClass.id) {
                        // @ts-ignore
                        this.selected = i;
                        // @ts-ignore
                        this.lastSelected = this.selected;
                        break;
                    }
                }
            }
        },
        scores(data: Horse[]) {
            // @ts-ignore
            this.horses = data;
        },
    },
})
export default class FanPanel extends Vue {
    public results: Class[] = [];
    public horses: Horse[] = [];
    public selected: number | null = null;
    public lastSelected: number | null = null;
    public created() {
        this.$socket.emit('results');
    }

    public changeClass() {
        if (typeof this.selected === 'number' && this.lastSelected !== this.selected) {
            this.lastSelected = this.selected;
            this.horses = [];
            this.$socket.emit('change-class', this.results[this.selected].id);
        }
    }
}
