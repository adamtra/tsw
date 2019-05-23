import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import Class from '@/types/class';
import {ClassService} from '@/services/class-service';
import DataTable from '@/components/DataTable';

@Component({
    components: {
        UiLoader,
        DataTable,
    },
})
export default class ClassDetails extends Vue {
    public $route!: Route;
    public classData!: Class;
    public loading = true;
    public headers = [
        {text: 'Numer', value: 'numer'},
        {text: 'Nazwa', value: 'nazwa'},
        {text: 'Maść', value: 'masc'},
        {text: 'Kraj', value: 'kraj'},
        {text: 'Rocznik', value: 'rocznik'},
    ];

    public mounted() {
        this.getDetails();
    }

    public getDetails() {
        this.loading = true;
        ClassService.get(Number(this.$route.params.id)).then((res) => {
            this.classData = res.data;
            this.loading = false;
        });
    }
}
