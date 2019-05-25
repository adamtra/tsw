<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-card>
            <v-card-title class="primary">
                <span class="headline" v-if="isNew">Dane nowego konia</span>
                <span class="headline" v-else>Dane konia o id: {{horseData.id}}</span>
            </v-card-title>
            <v-card-text>
                <div class="breadcrumb">
                    <router-link :to="'/horses'">
                        <a>Konie</a>
                    </router-link>
                    <span> > </span>
                    <a class="disabled" v-if="isNew">Nowy</a>
                    <a class="disabled" v-else>Szczegóły</a>
                </div>
                <v-tabs slider-color="primary">
                    <v-tab>
                        Dane główne
                    </v-tab>
                    <v-tab>
                        Hodowca
                    </v-tab>
                    <v-tab>
                        Rodowód
                    </v-tab>
                    <v-tab>
                        Właściciel
                    </v-tab>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.nazwa"
                                                :error-messages="checkError('nazwa')"
                                                @input="$v.horseData.nazwa.$touch()"
                                                @blur="$v.horseData.nazwa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Maść*"
                                                v-model="horseData.masc"
                                                :error-messages="checkError('masc')"
                                                @input="$v.horseData.masc.$touch()"
                                                @blur="$v.horseData.masc.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Numer*"
                                                v-model="horseData.numer"
                                                :error-messages="checkError('numer')"
                                                @input="$v.horseData.numer.$touch()"
                                                @blur="$v.horseData.numer.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Płeć*"
                                                v-model="horseData.plec"
                                                :error-messages="checkError('plec')"
                                                @input="$v.horseData.plec.$touch()"
                                                @blur="$v.horseData.plec.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Rocznik*"
                                                v-model="horseData.rocznik"
                                                :error-messages="checkError('rocznik')"
                                                @input="$v.horseData.rocznik.$touch()"
                                                @blur="$v.horseData.rocznik.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.kraj"
                                                :error-messages="checkError('kraj')"
                                                @input="$v.horseData.kraj.$touch()"
                                                @blur="$v.horseData.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Klasa*"
                                                v-model="horseData.klasa"
                                                :error-messages="checkError('klasa')"
                                                @input="$v.horseData.klasa.$touch()"
                                                @blur="$v.horseData.klasa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </form>
                    </v-tab-item>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                    <v-text-field
                                            label="Nazwa*"
                                            v-model="horseData.hodowca.nazwa"
                                            :error-messages="checkError2Level('hodowca', 'nazwa')"
                                            @input="$v.horseData.hodowca.nazwa.$touch()"
                                            @blur="$v.horseData.hodowca.nazwa.$touch()"
                                            required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.hodowca.kraj"
                                                :error-messages="checkError2Level('hodowca', 'kraj')"
                                                @input="$v.horseData.hodowca.kraj.$touch()"
                                                @blur="$v.horseData.hodowca.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </form>
                    </v-tab-item>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <h1>Matka</h1>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.rodowod.m.nazwa"
                                                :error-messages="checkError3Level('rodowod', 'm', 'nazwa')"
                                                @input="$v.horseData.rodowod.m.nazwa.$touch()"
                                                @blur="$v.horseData.rodowod.m.nazwa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.m.kraj"
                                                :error-messages="checkError3Level('rodowod', 'm', 'kraj')"
                                                @input="$v.horseData.rodowod.m.kraj.$touch()"
                                                @blur="$v.horseData.rodowod.m.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <h1>Ojciec</h1>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.rodowod.o.nazwa"
                                                :error-messages="checkError3Level('rodowod', 'o', 'nazwa')"
                                                @input="$v.horseData.rodowod.o.nazwa.$touch()"
                                                @blur="$v.horseData.rodowod.o.nazwa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.o.kraj"
                                                :error-messages="checkError3Level('rodowod', 'o', 'kraj')"
                                                @input="$v.horseData.rodowod.o.kraj.$touch()"
                                                @blur="$v.horseData.rodowod.o.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <h1>Ojciec matki</h1>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.rodowod.om.nazwa"
                                                :error-messages="checkError3Level('rodowod', 'om', 'nazwa')"
                                                @input="$v.horseData.rodowod.om.nazwa.$touch()"
                                                @blur="$v.horseData.rodowod.om.nazwa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.om.kraj"
                                                :error-messages="checkError3Level('rodowod', 'om', 'kraj')"
                                                @input="$v.horseData.rodowod.om.kraj.$touch()"
                                                @blur="$v.horseData.rodowod.om.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </form>
                    </v-tab-item>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.wlasciciel.nazwa"
                                                :error-messages="checkError2Level('wlasciciel', 'nazwa')"
                                                @input="$v.horseData.wlasciciel.nazwa.$touch()"
                                                @blur="$v.horseData.wlasciciel.nazwa.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.wlasciciel.kraj"
                                                :error-messages="checkError2Level('wlasciciel', 'kraj')"
                                                @input="$v.horseData.wlasciciel.kraj.$touch()"
                                                @blur="$v.horseData.wlasciciel.kraj.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </form>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" raised v-if="!isNew" @click="remove()" :disabled="deleting">
                    <span v-if="!deleting">Usuń</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
                <v-btn color="primary darken-1" raised @click="save()" :disabled="saving">
                    <span v-if="!saving">Zapisz</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts" src="./HorseDetails.ts"></script>

<style scoped>

</style>
