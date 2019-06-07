<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 v-for="judge of judges">
                <v-card>
                    <v-card-title class="primary">
                        <span class="headline">{{judge.sedzia}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-card v-for="horse of data.horses">
                                    <v-card-title primary-title>
                                        {{horse.nazwa}}
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                            <v-flex xs5 offset-xs1>
                                <v-card v-for="i in 3">
                                    <v-card-title primary-title :class="i === 1 ? 'gold' : i === 2 ? 'silver' : i === 3 ? 'bronze' : ''"></v-card-title>
                                </v-card>
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
