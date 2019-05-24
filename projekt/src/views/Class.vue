<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <ImportButton @imported="imported()"></ImportButton>
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
