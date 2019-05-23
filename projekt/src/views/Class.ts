import {Component, Vue} from 'vue-property-decorator';
import {ClassService} from '@/services/class-service';
@Component
export default class Class extends Vue {
    public classes: Class[] = [];
    public mounted() {
        ClassService.getAll().then((res) => {
           this.classes = res.data;
        });
    }
}
