<template>
    <UiLoader v-if="loading"></UiLoader>
    <DataTable
            v-else
            :title="title"
            :items="horses"
            :headers="headers"></DataTable>
</template>

<script lang="ts" src="./Horse.ts"></script>

<style scoped>

</style>
