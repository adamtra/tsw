import {Component, Prop, Vue} from 'vue-property-decorator';
import draggable from 'vuedraggable';
import {JudgeService} from '@/services/judge-service';
import Class from '@/types/class';
import Horse from '@/types/horse';
import {HorseService} from "@/services/horse-service";

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
    public scoreHorses(judgeId: number) {
        if (this.data.horses) {
            this.data.horses.forEach((horse) => {
                if (horse.czempionat) {
                    const bronze = horse.czempionat.wyniki.braz.indexOf(judgeId);
                    if (bronze > -1) {
                        horse.czempionat.wyniki.braz.splice(bronze, 1);
                    }
                    const silver = horse.czempionat.wyniki.srebro.indexOf(judgeId);
                    if (silver > -1) {
                        horse.czempionat.wyniki.srebro.splice(silver, 1);
                    }
                    const gold = horse.czempionat.wyniki.zloto.indexOf(judgeId);
                    if (gold > -1) {
                        horse.czempionat.wyniki.zloto.splice(gold, 1);
                    }
                }
            });
        }
        this.judges[judgeId - 1].rewarded.forEach((horse: any, key: number) => {
            if (this.data.horses) {
                for (const item of this.data.horses) {
                    if (item.id === horse.id) {
                        if (item.czempionat) {
                            if (key === 0) {
                                item.czempionat.wyniki.zloto.push(judgeId);
                            } else if (key === 1) {
                                item.czempionat.wyniki.srebro.push(judgeId);
                            } else if (key === 2) {
                                item.czempionat.wyniki.braz.push(judgeId);
                            }
                        }
                        break;
                    }
                }
            }
        });
        if (this.data.horses) {
            this.data.horses.forEach((horse) => {
                HorseService.edit(horse);
            });
        }
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
