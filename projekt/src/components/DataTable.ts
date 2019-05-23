import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DataTable extends Vue {
    @Prop() public headers: any;
    @Prop() public items: any;
    @Prop() public title: any;
    public search = '';
}
