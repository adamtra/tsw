<template>
    <UiLoader v-if="loading"></UiLoader>
    <div v-else>
        <v-card>
            <v-card-title class="primary">
                <span class="headline">Ocena konia: {{scoreData.horse.nazwa}}</span>
            </v-card-title>
            <v-card-text>
                <div class="breadcrumb">
                    <router-link :to="'/classes'">
                        <a>Klasy</a>
                    </router-link>
                    <span> > </span>
                    <router-link :to="'/classes/' + $route.params.id">
                        <a>Szczegóły</a>
                    </router-link>
                    <span> > </span>
                    <a class="disabled">Ocena</a>
                </div>
                <table class="score-table">
                    <tr>
                        <th>Typ</th>
                        <th>Głowa</th>
                        <th>Kłoda</th>
                        <th>Nogi</th>
                        <th>Ruch</th>
                        <th>Sędzia</th>
                    </tr>
                    <tr v-for="(score, key) of scoreData.horse.wynik.noty">
                        <td>
                            <ScoreInput :score="score.typ" :row="key" :column="0" @input="updateValue(key, 'typ', $event)"></ScoreInput>
                        </td>
                        <td>
                            <ScoreInput :score="score.glowa" :row="key"  :column="1" @input="updateValue(key, 'glowa', $event)"></ScoreInput>
                        </td>
                        <td>
                            <ScoreInput :score="score.kloda" :row="key"  :column="2" @input="updateValue(key, 'kloda', $event)"></ScoreInput>
                        </td>
                        <td>
                            <ScoreInput :score="score.nogi" :row="key"  :column="3" @input="updateValue(key, 'nogi', $event)"></ScoreInput>
                        </td>
                        <td>
                            <ScoreInput :score="score.ruch" :row="key"  :column="4" @input="updateValue(key, 'ruch', $event)"></ScoreInput>
                        </td>
                        <td>{{scoreData.komisja[key].sedzia}}</td>
                    </tr>
                </table>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" raised @click="saveScore()" :disabled="saving || errors.filter(x => x === 1).length > 0">
                    <span v-if="!saving">Zapisz</span>
                    <v-progress-circular indeterminate color="accent" v-else></v-progress-circular>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts" src="./HorseScore.ts"></script>

<style scoped lang="less">
    table {
        &.score-table {
            width: 100%;
        }
        td {
            text-align: center;
        }
    }
</style>
