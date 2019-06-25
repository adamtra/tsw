<template>
    <div>
        <h1>Wyniki:</h1>
        <v-expansion-panel :popout="true" v-model="selected" :change="changeClass()">
            <v-expansion-panel-content class="secondary"
                    v-for="(classData, i) in results"
                    :key="i">
                <template v-slot:header>
                    <div>
                        {{classData.numer}} - {{classData.kat}}
                        <span v-if="classData.zamknieta">(Zakończono)</span>
                    </div>
                </template>
                <v-card v-if="selected === i">
                    <v-card-text v-if="horses.length > 0">
                        <ClassScore :horses="horses" :championship="!classData.czempionat"></ClassScore>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script lang="ts" src="./FanPanel.ts"></script>

<style scoped>

</style>
