<template>
    <v-text-field
            :error-messages="error"
            max="20"
            min="0"
            step="0.5"
            @keydown="nextRow(row, column, $event)"
            type="number"
            v-model="scoreValue"
            solo>
    </v-text-field>
</template>

<script lang="ts" src="./ScoreInput.ts"></script>

<style scoped>

</style>
