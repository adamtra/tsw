import {Component, Vue} from 'vue-property-decorator';
import LoginDialog from '@/components/LoginDialog';

@Component({
    components: {
        LoginDialog,
    },
})
export default class App extends Vue {
    public drawer = null;
    public showLogin = false;
}
