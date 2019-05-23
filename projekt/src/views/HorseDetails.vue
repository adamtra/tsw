<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <h1>Dane konia o id: {{horseData.id}}</h1>
        <ul>
            <li>Numer: {{horseData.numer}}</li>
            <li>Nazwa: {{horseData.nazwa}}</li>
        </ul>
    </div>
</template>

<script lang="ts" src="./HorseDetails.ts"></script>

<style scoped>

</style>
