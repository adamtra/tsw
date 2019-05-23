<template>
    <UiLoader v-if="loading"></UiLoader>
    <DataTable
            v-else
            :title="title"
            :items="judges"
            :headers="headers"></DataTable>
</template>

<script lang="ts" src="./Judge.ts"></script>

<style scoped>

</style>
