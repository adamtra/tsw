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
                    <v-tab>
                        Konie
                    </v-tab>
                    <v-tab>
                        Wyniki
                    </v-tab>

                    <v-tab-item>
                        <form>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Kategoria*"
                                                v-model="classData.kat"
                                                :error-messages="checkError('kat')"
                                                @input="$v.classData.kat.$touch()"
                                                @blur="$v.classData.kat.$touch()"
                                                required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                label="Numer*"
                                                v-model="classData.numer"
                                                :error-messages="checkError('numer')"
                                                @input="$v.classData.numer.$touch()"
                                                @blur="$v.classData.numer.$touch()"
                                                required></v-text-field>
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
                                                :error-messages="checkError('komisja')"
                                                @input="$v.classData.komisja.$touch()"
                                                @blur="$v.classData.komisja.$touch()"
                                                required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12 v-if="classData.czempionat">
                                        <v-autocomplete
                                                label="Czempionat*"
                                                v-model="classData.czempionat"
                                                :items="classes"
                                                item-text="option"
                                                item-value="id"
                                                :error-messages="checkError('czempionat')"
                                                @input="$v.classData.czempionat.$touch()"
                                                @blur="$v.classData.czempionat.$touch()"
                                                required></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </form>
                    </v-tab-item>
                    <v-tab-item>
                        <DataTable
                                :url="'classes/' + classData.id"
                                title="Konie w klasie"
                                :items="classData.horses"
                                :headers="headers">
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item>
                        <ClassScore :horses="classData.horses"></ClassScore>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" raised v-if="!isNew" @click="remove()" :disabled="deleting">
                    <span v-if="!deleting">Usuń</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
                <v-btn color="primary darken-1" raised @click="save()" :disabled="saving || $v.classData.$invalid">
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
