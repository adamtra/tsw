import {Component, Vue} from 'vue-property-decorator';
import LoginDialog from '@/components/LoginDialog';

@Component({
    components: {
        LoginDialog,
    },
})
export default class App extends Vue {
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
}

interface MenuOptions {
    icon: string;
    name: string;
    router: string;
}
