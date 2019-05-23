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
                    hide-details
            ></v-text-field>
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
                <td v-for="cols in headers" v-if="cols.value !== 'opcje'">
                    {{ props.item[cols.value] }}
                </td>
                <td v-else>
                    <v-btn class="primary">Szczegóły</v-btn>
                    <v-btn class="error">Usuń</v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script lang="ts" src="./DataTable.ts"></script>
<style scoped>

</style>
