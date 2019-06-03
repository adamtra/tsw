<template>
    <v-btn color="primary darken-1" raised @click="newShow()" :disabled="creating">
        <v-icon left>note_add</v-icon>
        <span v-if="!creating">
            Rozpocznij nowy konkurs
        </span>
        <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
    </v-btn>
</template>

<script lang="ts" src="./NewShowButton.ts"></script>

<style scoped>

</style>
