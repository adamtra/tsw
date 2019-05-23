<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <div class="breadcrumb">
            <router-link :to="'/judges'">
                <a>Sędziowie</a>
            </router-link>
            <span> > </span>
            <a class="disabled">Szczegóły</a>
        </div>
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
