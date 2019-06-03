<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-btn class="primary" to="/classes/new">
            <v-icon left>add</v-icon>
            Dodaj
        </v-btn>
        <ImportButton @imported="getClasses()"></ImportButton>
        <NewShowButton @imported="getClasses()"></NewShowButton>
        <DataTable
            @remove="remove"
            url="classes"
            :title="title"
            :items="classes"
            :headers="headers"></DataTable>
    </div>
</template>

<script lang="ts" src="./Class.ts"></script>

<style scoped>

</style>
