<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
    <v-btn class="primary" to="/judges/new">
        <v-icon left>add</v-icon>
        Dodaj
    </v-btn>
    <ImportButton @imported="imported()"></ImportButton>
    <DataTable
            @remove="remove"
            url="judges"
            :title="title"
            :items="judges"
            :headers="headers"></DataTable>
    </div>
</template>

<script lang="ts" src="./Judge.ts"></script>

<style scoped>

</style>
