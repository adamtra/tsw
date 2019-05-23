import {Component, Vue} from 'vue-property-decorator';
import {Route} from 'vue-router';
import UiLoader from '@/components/UiLoader';
import Class from '@/types/class';
import {ClassService} from '@/services/class-service';

@Component({
    components: {
      UiLoader,
    },
})
export default class ClassDetails extends Vue {
    public $route!: Route;
    public classData!: Class;
    public loading = true;
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
