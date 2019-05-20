import {Component, Vue} from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
@Component
export default class Judge extends Vue {
    @Action('getDefaultJudges') public getDefaultJudges: any;
    @Getter('getJudge') public getJudge: any;
    public id = 5;
    public mounted() {
        this.getDefaultJudges();
    }

    get judge(): Judge {
        return this.getJudge(this.id);
    }
}
