import {Component, Vue} from 'vue-property-decorator';
import {ImportService} from '@/services/import-service';

@Component
export default class ImportButton extends Vue {
    public importing = false;
    public importData() {
        this.importing = true;
        ImportService.importData().then(() => {
            this.$emit('imported');
            this.importing = false;
        }, () => {
            this.importing = false;
        });
    }
}
