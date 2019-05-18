<template>
    <v-app dark id="app">
        <v-navigation-drawer v-model="drawer" fixed app :clipped="$vuetify.breakpoint.lgAndUp">
            <v-list dense>
                <v-list-tile :to="'/'">
                    <v-list-tile-action>
                        <i class="fas fa-home fa-2x"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Strona główna</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" fixed app :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Strona główna</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon large>
                <i class="fas fa-sign-in-alt"></i>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<style lang="less">

</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    name: 'App'
})
export default class App extends Vue {
    data() {
        return {
            drawer: null
        }
    }
}
</script>
