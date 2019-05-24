<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>

    <DataTable

            @remove="remove"
            url="judges"
            :title="title"
            :items="judges"
            :headers="headers"></DataTable>
    </div>
</template>

<script lang="ts" src="./Judge.ts"></script>

<style scoped>

</style>
