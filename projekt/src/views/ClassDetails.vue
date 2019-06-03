<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-card>
            <v-card-title class="primary">
                <span class="headline" v-if="isNew">Dane nowej klasy</span>
                <span class="headline" v-else>Dane klasy o id: {{classData.id}}</span>
            </v-card-title>
            <v-card-text>
                <div class="breadcrumb">
                    <router-link :to="'/classes'">
                        <a>Klasy</a>
                    </router-link>
                    <span> > </span>
                    <a class="disabled" v-if="isNew">Nowy</a>
                    <a class="disabled" v-else>Szczegóły</a>
                </div>
                <v-tabs slider-color="primary">
                    <v-tab>
                        Dane główne
                    </v-tab>
                    <v-tab v-if="!isNew">
                        Konie
                    </v-tab>
                    <v-tab v-if="!isNew">
                        Wyniki
                    </v-tab>

                    <v-tab-item>
                        <v-form v-model="valid">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kategoria*"
                                                v-model="classData.kat"
                                                :rules="emptyRules"
                                                :disabled="classData.zamknieta"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Numer*"
                                                v-model.number="classData.numer"
                                                :rules="numberRules"
                                                :disabled="classData.zamknieta"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 v-if="classData.czempionat && !isNew">
                                        <v-autocomplete
                                                label="Czempionat*"
                                                v-model="classData.czempionat"
                                                :items="classes"
                                                item-text="option"
                                                item-value="id"
                                                :rules="emptyRules"
                                                :disabled="classData.zamknieta"
                                                required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12 v-if="isNew">
                                        <v-checkbox
                                                color="primary"
                                                v-model="isChampion"
                                                @change="changeType"
                                                label="Klasa czempionatowa"
                                        ></v-checkbox>
                                    </v-flex>
                                    <v-flex xs12 v-if="isNew && !isChampion">
                                        <v-autocomplete
                                                label="Czempionat*"
                                                v-model="classData.czempionat"
                                                :items="classes"
                                                item-text="option"
                                                item-value="id"
                                                :rules="isChampion ? [] : emptyRules"
                                                :disabled="isChampion"
                                                required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-autocomplete
                                                label="Komisja*"
                                                v-model="classData.komisja"
                                                :items="judges"
                                                item-text="sedzia"
                                                item-value="id"
                                                multiple
                                                chips
                                                :rules="emptyArrayRules"
                                                :disabled="classData.zamknieta || classData.horses.filter((x) => x.wynik.oceniono).length > 0"
                                                required></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item v-if="!isNew">
                        <DataTable
                                :url="'classes/' + classData.id"
                                title="Konie w klasie"
                                :items="classData.horses"
                                :headers="headers">
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item v-if="!isNew">
                        <ClassScore :horses="classData.horses"></ClassScore>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions v-if="!classData.zamknieta">
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" raised v-if="!isNew" @click="remove()" :disabled="deleting">
                    <span v-if="!deleting">Usuń</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
                <v-btn color="secondary darken-1" raised v-if="!isNew" @click="closeClass()" :disabled="closing || !valid || classData.horses.filter(x => !x.wynik.oceniono).length > 0">
                    <span v-if="!closing">Zamknij klasę</span>
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

<script lang="ts" src="./ClassDetails.ts"></script>

<style scoped>

</style>
