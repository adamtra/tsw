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
            this.results = data;
            // @ts-ignore
            this.componentKey++;
        },
    },
})
export default class FanPanel extends Vue {
    public results: Class[] = [];
    public componentKey = 0;
    public created() {
        this.$socket.emit('results');
    }
}
