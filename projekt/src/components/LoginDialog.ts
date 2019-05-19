import {Component, Prop, Vue} from 'vue-property-decorator';
import {validationMixin} from 'vuelidate';
import {required, email} from 'vuelidate/lib/validators';

const validations = {
    email: {required, email},
    password: {required},
};

@Component({
    mixins: [validationMixin],
    validations,
})
export default class LoginDialog extends Vue {

    get show() {
        return this.value;
    }

    set show(value) {
        this.$emit('input', value);
    }

    get emailErrors() {
        const errors: string[] = [];
        if (this.$v.email) {
            if (!this.$v.email.$invalid) {
                return errors;
            } else {
                errors.push('Podaj poprawny adres email');
            }
        }
        return errors;
    }

    get passwordErrors() {
        const errors: string[] = [];
        if (this.$v.password) {
            if (!this.$v.password.$invalid) {
                return errors;
            } else {
                errors.push('Hasło jest wymagane');
            }
        }
        return errors;
    }

    public email = '';
    public password = '';

    @Prop() private value: boolean = false;
    private loading = false;

    private login() {
        if (!this.$v.$invalid) {
            this.loading = true;
        }
    }
}
