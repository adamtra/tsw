<template>
    <UiLoader v-if="loading"></UiLoader>
    <DataTable
            v-else
            url="horses"
            :title="title"
            :items="horses"
            :headers="headers"></DataTable>
</template>

<script lang="ts" src="./Horse.ts"></script>

<style scoped>

</style>
