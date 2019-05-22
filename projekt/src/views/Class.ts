import {Component, Vue} from 'vue-property-decorator';
import {State, Action, Getter} from 'vuex-class';
@Component
export default class Class extends Vue {
    @Action('getClasses') public getClasses: any;
    @Getter('classes') public classes: any;
    public mounted() {
        this.getClasses();
    }
}
