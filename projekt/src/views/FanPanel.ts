import {Component, Vue} from 'vue-property-decorator';
import Class from '@/types/class';
import ClassScore from '@/components/ClassScore';

@Component({
    components: {
        ClassScore,
    },
    sockets: {
        scores(data: Class[]) {
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
                        break;
                    }
                }
            }
        },
    },
})
export default class FanPanel extends Vue {
    public results: Class[] = [];
    public selected: number | null = null;
    public created() {
        this.$socket.emit('results');
    }
}
