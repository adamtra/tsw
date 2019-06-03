<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-btn class="primary" to="/horses/new">
            <v-icon left>add</v-icon>
            Dodaj
        </v-btn>
        <ImportButton @imported="getHorses()"></ImportButton>
        <NewShowButton @imported="getHorses()"></NewShowButton>
        <DataTable
            @remove="remove"
            url="horses"
            :title="title"
            :items="horses"
            :headers="headers"></DataTable>
    </div>
</template>

<script lang="ts" src="./Horse.ts"></script>

<style scoped>

</style>
