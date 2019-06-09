import {Component, Prop, Vue} from 'vue-property-decorator';
import draggable from 'vuedraggable';
import {JudgeService} from '@/services/judge-service';
import Class from '@/types/class';
import Horse from '@/types/horse';

@Component({
    components: {
        draggable,
    },
})
export default class ChampionshipScore extends Vue {
    @Prop({
        default: [],
    }) public data!: Class;
    private judges: any = [];
    public created() {
        this.getData();
    }
    public onMove($event: any) {
       return ($event.relatedContext.list.length !== 3);
    }
    private getData() {
        this.data.komisja.forEach((id) => {
            JudgeService.get(id).then((res) => {
                const horses = this.data.horses ? JSON.parse(JSON.stringify(this.data.horses)) : [];
                Vue.set(this.judges, res.data.id - 1, {
                    data: res.data,
                    horses: horses.filter((horse: Horse) => {
                        if (horse.czempionat) {
                            return !(horse.czempionat.wyniki.zloto.includes(id) ||
                                horse.czempionat.wyniki.srebro.includes(id) ||
                                horse.czempionat.wyniki.braz.includes(id));
                        }
                        return false;
                    }),
                    rewarded: horses.filter((horse: Horse) => {
                        if (horse.czempionat) {
                            return horse.czempionat.wyniki.zloto.includes(id) ||
                                horse.czempionat.wyniki.srebro.includes(id) ||
                                horse.czempionat.wyniki.braz.includes(id);
                        }
                        return false;
                    }),
                });
            });
        });
    }
}
