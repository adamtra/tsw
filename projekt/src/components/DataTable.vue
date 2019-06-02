<template>
    <v-card>
        <v-card-title>
            <h1>{{title}}</h1>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Wyszukaj"
                    single-line
                    hide-details></v-text-field>
        </v-card-title>
        <v-data-table
                :search="search"
                :headers="headers"
                :items="items">
            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                    Brak wyników
                </v-alert>
            </template>
            <template v-slot:items="props">
                <td v-for="cols in headers" v-if="cols.value === 'opcje'">
                    <v-btn class="primary" :to="'/' + url + '/' + props.item.id.toString()">Szczegóły</v-btn>
                    <v-btn class="error" @click="remove(props.item.id)">Usuń</v-btn>
                </td>
                <td v-else-if="cols.value === 'opcje_klasa'">
                    <v-btn class="primary" :to="'/' + url + '/' + props.item.id.toString()">Szczegóły</v-btn>
                    <v-btn class="error" v-if="!props.item.zamknieta" @click="remove(props.item.id)">Usuń</v-btn>
                </td>
                <td v-else-if="cols.value === 'ocena'">
                    <v-btn class="primary" :to="'/' + url + '/' + props.item.id.toString()">Oceń</v-btn>
                </td>
                <td v-else-if="cols.value === 'oceniono'">
                    <i :class="props.item.wynik.oceniono ? 'fa-2x fas fa-check' : 'fa-2x fas fa-times'"></i>
                </td>
                <td v-else>
                    {{ props.item[cols.value] }}
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script lang="ts" src="./DataTable.ts"></script>
<style scoped>

</style>
