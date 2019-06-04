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
            <div v-for="(horseGroup, key) of drawHorses" class="horseGroup">
                <h3>Walka o pozycje: {{horseGroup[0].position + 1}} - {{horseGroup[horseGroup.length - 1].position + 1}}</h3>
                <draggable :list="horseGroup" @end="endDrag(key)">
                    <v-card v-for="horse of horseGroup" :key="horse.data.id"
                            :class="horse.data.wynik.rozjemca === 0 ? 'gold' : horse.data.wynik.rozjemca === 1 ? 'silver' : horse.data.wynik.rozjemca === 2 ? 'bronze' : ''">
                        <v-card-title primary-title>
                            {{horse.data.nazwa}}
                        </v-card-title>
                    </v-card>
                </draggable>
            </div>
            <v-btn color="secondary darken-1" raised @click="closeClass" :disabled="closing">
                <span v-if="!closing">Zamknij klasę</span>
                <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
            </v-btn>
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
