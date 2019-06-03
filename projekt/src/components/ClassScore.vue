<template>
    <div>
        <v-card v-for="(horse, key) of rankedHorses" :key="horse.id" :class="key === 0 ? 'gold' : key === 1 ? 'silver' : key === 2 ? 'bronze' : ''">
            <v-card-title primary-title>
                <v-icon left v-if="horse.wynik.draw">warning</v-icon>{{key + 1}}. {{horse.nazwa}} - {{horse.wynik.suma}}
            </v-card-title>
        </v-card>
    </div>
</template>

<script lang="ts" src="./ClassScore.ts"></script>

<style scoped></style>
