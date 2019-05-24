import {Component, Vue} from 'vue-property-decorator';
import LoginDialog from '@/components/LoginDialog';
import {Action, Getter} from 'vuex-class';

@Component({
    components: {
        LoginDialog,
    },
})
export default class App extends Vue {
    @Action('setTheme') public setTheme: any;
    @Getter('darkTheme') public darkTheme: any;
    public drawer: boolean | null = null;
    public showLogin: boolean = false;
    public isAuthorized: boolean = true;
    public adminOptions: MenuOptions[] = [{
        icon: 'fas fa-gavel fa-2x',
        name: 'Sędziowie',
        router: '/judges',
    }, {
        icon: 'fas fa-chess-knight fa-2x',
        name: 'Konie',
        router: '/horses',
    }, {
        icon: 'fas fa-certificate fa-2x',
        name: 'Klasy',
        router: '/classes',
    }];

    get theme() {
        return this.darkTheme;
    }

    set theme(value) {
        this.setTheme(value);
    }
}

interface MenuOptions {
    icon: string;
    name: string;
    router: string;
}
