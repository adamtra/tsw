<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <div class="breadcrumb">
            <router-link :to="'/classes'">
                <a>Klasy</a>
            </router-link>
            <span> > </span>
            <a class="disabled">Szczegóły</a>
        </div>
        <h1>Dane klasy o id: {{classData.id}}</h1>
        <ul>
            <li>Numer: {{classData.numer}}</li>
            <li>Kategoria: {{classData.kat}}</li>
        </ul>
        <DataTable
                url=""
                title="Konie w klasie"
                :items="classData.horses"
                :headers="headers">
        </DataTable>
    </div>
</template>

<script lang="ts" src="./ClassDetails.ts"></script>

<style scoped>

</style>
