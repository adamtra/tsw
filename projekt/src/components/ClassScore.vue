<template>
    <div>
        <v-btn v-if="!showDraws && editable && hasDraw"
               :disabled="horses.length !== rankedHorses.length"
               @click="arbitrator()"
               class="primary">Wprowadź rozjemcę i zaknij klasę</v-btn>
        <div v-if="!showDraws">
            <v-card v-for="(horse, key) of rankedHorses" :key="horse.id" :class="key === 0 ? 'gold' : key === 1 ? 'silver' : key === 2 ? 'bronze' : ''">
                <v-card-title primary-title>
                    <v-icon left v-if="horse.wynik.draw">warning</v-icon>{{key + 1}}. {{horse.nazwa}} - {{horse.wynik.suma}}
                </v-card-title>
            </v-card>
        </div>
        <div v-else>
            <div v-for="horseGroup of drawHorses" class="horseGroup">
                <v-card v-for="horse of horseGroup" :key="horse.data.id">
                    <v-card-title primary-title>
                        {{horse.position + 1}}. {{horse.data.nazwa}}
                    </v-card-title>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ClassScore.ts"></script>

<style scoped lang="less">
    @distance: 20px;
    .horseGroup {
        margin-bottom: @distance;
        margin-top: @distance;
    }
</style>
