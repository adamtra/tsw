import {Component, Vue} from 'vue-property-decorator';
import LoginDialog from '@/components/LoginDialog';
import {Action, Getter} from 'vuex-class';
import {UserService} from '@/services/user-service';
import router from '@/router';

@Component({
    components: {
        LoginDialog,
    },
})
export default class App extends Vue {
    @Action('setTheme') public setTheme: any;
    @Action('deleteToken') public deleteToken: any;
    @Getter('darkTheme') public darkTheme: any;
    @Getter('token') public token: any;
    public drawer: boolean | null = null;
    public showLogin: boolean = false;
    public isAuthorized: boolean = false;
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

    public created() {
        this.checkToken();
    }

    public checkToken() {
        if (this.token) {
            UserService.checkToken().then(() => {
                this.isAuthorized = true;
            });
        }
    }

    public dialogClosed(value: boolean) {
        if (value) {
            this.showLogin = false;
            this.isAuthorized = true;
        }
    }

    public logout() {
        UserService.logout().then(() => {
            this.deleteToken();
            this.isAuthorized = false;
            router.push('/');
        });
    }

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
