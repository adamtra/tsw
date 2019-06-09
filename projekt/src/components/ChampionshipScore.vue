<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 v-for="judge of judges" :key="judge.data.id">
                <v-card>
                    <v-card-title class="primary">
                        <span class="headline">{{judge.data.sedzia}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <draggable :move="onMove" :list="judge.horses" :group="'horses_' + judge.data.id">
                                    <v-card v-for="horse of judge.horses" :key="horse.id">
                                        <v-card-title primary-title>
                                            {{horse.nazwa}}
                                        </v-card-title>
                                    </v-card>
                                </draggable>
                            </v-flex>
                            <v-flex xs5 offset-xs1>
                                <draggable :list="judge.rewarded" :group="'horses_' + judge.data.id">
                                    <v-card v-for="(horse, key) of judge.rewarded" :key="horse.id">
                                        <v-card-title primary-title
                                                      :class="key === 0 ? 'gold' : key === 1 ? 'silver' : key === 2 ? 'bronze' : ''">
                                            {{horse.nazwa}}
                                        </v-card-title>
                                    </v-card>
                                </draggable>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts" src="./ChampionshipScore.ts"></script>

<style scoped>

</style>
