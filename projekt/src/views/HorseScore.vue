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
            </v-card-text>
            <table class="score-table">
                <tr>
                    <th>Głowa</th>
                    <th>Kłoda</th>
                    <th>Nogi</th>
                    <th>Ruch</th>
                    <th>Typ</th>
                    <th>Sędzia</th>
                </tr>
                <tr v-for="(score, key) of scoreData.horse.wynik.noty">
                    <td>
                        <v-text-field
                                max="20"
                                min="0"
                                step="0.5"
                                @keydown="nextRow(key, 0, $event)"
                                type="number"
                                v-model="score.typ"
                                solo>
                        </v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                max="20"
                                min="0"
                                step="0.5"
                                @keydown="nextRow(key, 1, $event)"
                                type="number"
                                v-model="score.glowa"
                                solo>
                        </v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                max="20"
                                min="0"
                                step="0.5"
                                @keydown="nextRow(key, 2, $event)"
                                type="number"
                                v-model="score.kloda"
                                solo>
                        </v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                max="20"
                                min="0"
                                step="0.5"
                                @keydown="nextRow(key, 3, $event)"
                                type="number"
                                v-model="score.nogi"
                                solo>
                        </v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                max="20"
                                min="0"
                                step="0.5"
                                @keydown="nextRow(key, 4, $event)"
                                type="number"
                                v-model="score.ruch"
                                solo>
                        </v-text-field>
                    </td>
                    <td>{{scoreData.komisja[key].sedzia}}</td>
                </tr>
            </table>
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
