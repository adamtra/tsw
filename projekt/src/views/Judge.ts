import {Component, Vue} from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
@Component
export default class Judge extends Vue {
    @Action('getJudges') public getJudges: any;
    @Getter('getJudge') public getJudge: any;
    public id = 5;
    public mounted() {
        this.getJudges();
    }

    get judge(): Judge {
        return this.getJudge(this.id);
    }
}
