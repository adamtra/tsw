<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="500px">
            <v-card>
                <v-card-title class="primary">
                    <span class="headline">Logowanie</span>
                </v-card-title>
                <v-card-text>
                    <form>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="person"
                                            label="Email*"
                                            v-model="email"
                                            :error-messages="emailErrors"
                                            @input="$v.email.$touch()"
                                            @blur="$v.email.$touch()"
                                            required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="lock"
                                            label="Hasło*"
                                            v-model="password"
                                            :error-messages="passwordErrors"
                                            @input="$v.password.$touch()"
                                            @blur="$v.password.$touch()"
                                            type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" raised @click="show = false">Zamknij</v-btn>
                    <v-btn color="primary darken-1" raised @click="login()">
                        <span v-if="!loading">Zaloguj</span>
                        <v-progress-circular indeterminate color="accent" v-if="loading"></v-progress-circular>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {validationMixin} from 'vuelidate';
    import {required, email} from 'vuelidate/lib/validators'

    let validations = {
        email: {required, email},
        password: {required},
    };

    @Component({
        mixins: [validationMixin],
        validations: validations,
    })
    export default class LoginDialog extends Vue {
        @Prop() private value: Boolean = false;
        email = '';
        password = '';
        private loading = false;

        get show() {
            return this.value;
        }

        set show(value) {
            this.$emit('input', value);
        }

        get emailErrors() {
            const errors: string[] = [];
            if (this.$v.email) {
                if (!this.$v.email.$dirty) {
                    return errors
                }
                !this.$v.email.email && errors.push('Podaj poprawny adres email');
                !this.$v.email.required && errors.push('Adres email jest wymagany');
            }
            return errors
        }

        get passwordErrors () {
            const errors:any = [];
            if (this.$v.password) {
                if (!this.$v.password.$dirty) {
                    return errors;
                }
                !this.$v.password.required && errors.push('Hasło jest wymagane');
            }
            return errors
        }

        login() {
            if (!this.$v.$invalid) {
                this.loading = true;
            }
        }
    }
</script>
