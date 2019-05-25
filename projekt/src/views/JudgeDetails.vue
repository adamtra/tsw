<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-card>
            <v-card-title class="primary">
                <span class="headline" v-if="isNew">Dane nowego sędziego</span>
                <span class="headline" v-else>Dane sędziego o id: {{judgeData.id}}</span>
            </v-card-title>
            <v-card-text>
                <div class="breadcrumb">
                    <router-link :to="'/judges'">
                        <a>Sędziowie</a>
                    </router-link>
                    <span> > </span>
                    <a class="disabled" v-if="isNew">Nowy</a>
                    <a class="disabled" v-else>Szczegóły</a>
                </div>
                <form>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Imię i nazwisko*"
                                        v-model="judgeData.sedzia"
                                        :error-messages="sedziaErrors"
                                        @input="$v.judgeData.sedzia.$touch()"
                                        @blur="$v.judgeData.sedzia.$touch()"
                                        required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        label="Kraj*"
                                        v-model="judgeData.kraj"
                                        :error-messages="krajErrors"
                                        @input="$v.judgeData.kraj.$touch()"
                                        @blur="$v.judgeData.kraj.$touch()"
                                        required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" raised v-if="!isNew" @click="remove()" :disabled="deleting">
                    <span v-if="!deleting">Usuń</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
                <v-btn color="primary darken-1" raised @click="save()" :disabled="saving || $v.judgeData.$invalid">
                    <span v-if="!saving">Zapisz</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts" src="./JudgeDetails.ts"></script>

<style scoped>

</style>
