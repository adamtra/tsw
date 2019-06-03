import {Component, Vue} from 'vue-property-decorator';
import {ImportService} from '@/services/import-service';

@Component
export default class NewShowButton extends Vue {
    public creating = false;
    public newShow() {
        this.creating = true;
        ImportService.newShow().then(() => {
            this.$emit('imported');
            this.creating = false;
        }, () => {
            this.creating = false;
        });
    }
}
