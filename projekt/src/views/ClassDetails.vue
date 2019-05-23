<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <h1>Dane klasy o id: {{classData.id}}</h1>
        <ul>
            <li>Numer: {{classData.numer}}</li>
            <li>Kategoria: {{classData.kat}}</li>
        </ul>
    </div>
</template>

<script lang="ts" src="./ClassDetails.ts"></script>

<style scoped>

</style>
