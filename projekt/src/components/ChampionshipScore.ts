import {Component, Prop, Vue} from 'vue-property-decorator';
import draggable from 'vuedraggable';
import Class from '@/types/class';
import {JudgeService} from '@/services/judge-service';
import Judge from '@/types/judge';

@Component({
    components: {
        draggable,
    },
})
export default class ChampionshipScore extends Vue {
    @Prop() public data!: Class;
    public judges: Judge[] = [];
    public created() {
        this.getData();
    }

    private getData() {
        this.judges = [];
        this.data.komisja.forEach((id) => {
            JudgeService.get(id).then((res) => {
                this.judges[res.data.id - 1] = res.data;
            });
        });
    }
}
