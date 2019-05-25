<template>
    <v-btn color="primary darken-1" raised @click="importData()" :disabled="importing">
        <v-icon left>cloud_download</v-icon>
        <span v-if="!importing">
            Importuj dane
        </span>
        <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
    </v-btn>
</template>

<script lang="ts" src="./ImportButton.ts"></script>

<style scoped>

</style>
