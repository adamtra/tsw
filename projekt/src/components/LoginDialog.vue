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
                    <v-btn color="primary darken-1" raised @click="login()" :disabled="$v.$invalid || loading">
                        <span v-if="!loading">Zaloguj</span>
                        <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts" src="./LoginDialog.ts"></script>
