import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DataTable extends Vue {
    @Prop() public headers: any;
    @Prop() public items: any;
    @Prop() public title: any;
    @Prop() public url: any;
    public search = '';
    public showDelete = false;

    public remove(id: number) {
        this.$emit('remove', id);
    }
}
