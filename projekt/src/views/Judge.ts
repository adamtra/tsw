import {Component, Vue} from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
@Component
export default class Judge extends Vue {
    @Action('getJudges') public getJudges: any;
    @Getter('judges') public judges: any;
    public mounted() {
        this.getJudges();
    }
}
