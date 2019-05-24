<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <ImportButton @imported="imported()"></ImportButton>
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
