<template>
    <UiLoader v-if="loading"></UiLoader>
    <DataTable
            v-else
            :title="title"
            :items="classes"
            :headers="headers"></DataTable>
</template>

<script lang="ts" src="./Class.ts"></script>

<style scoped>

</style>
