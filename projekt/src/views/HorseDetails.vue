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
                        <v-form v-model="valid">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.nazwa"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Maść*"
                                                v-model="horseData.masc"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Numer*"
                                                v-model.number="horseData.numer"
                                                :rules="numberRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Płeć*"
                                                v-model="horseData.plec"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Rocznik*"
                                                v-model.number="horseData.rocznik"
                                                :rules="numberRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.kraj"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-autocomplete
                                                label="Klasa*"
                                                v-model="horseData.klasa"
                                                :items="classes"
                                                item-text="option"
                                                item-value="id"
                                                :rules="emptyRules"
                                                required></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-tab-item>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                    <v-text-field
                                            label="Nazwa*"
                                            v-model="horseData.hodowca.nazwa"
                                            :rules="emptyRules"
                                            required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.hodowca.kraj"
                                                :rules="emptyRules"
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
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.m.kraj"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <h1>Ojciec</h1>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.rodowod.o.nazwa"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.o.kraj"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <h1>Ojciec matki</h1>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Nazwa*"
                                                v-model="horseData.rodowod.om.nazwa"
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.rodowod.om.kraj"
                                                :rules="emptyRules"
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
                                                :rules="emptyRules"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kraj*"
                                                v-model="horseData.wlasciciel.kraj"
                                                :rules="emptyRules"
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
                <v-btn color="primary darken-1" raised @click="save()" :disabled="saving || !valid">
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
