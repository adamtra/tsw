<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <h1>Dane sędziego o id: {{judgeData.id}}</h1>
        <ul>
            <li>Imię: {{judgeData.sedzia}}</li>
            <li>Kraj: {{judgeData.kraj}}</li>
        </ul>
    </div>
</template>

<script lang="ts" src="./JudgeDetails.ts"></script>

<style scoped>

</style>
