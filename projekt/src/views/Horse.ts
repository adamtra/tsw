import {Component, Vue} from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
@Component
export default class Horse extends Vue {
    @Action('getHorses') public getHorses: any;
    @Getter('horses') public horses: any;
    public mounted() {
        this.getHorses();
    }
}
