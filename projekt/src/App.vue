<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" fixed app :clipped="$vuetify.breakpoint.lgAndUp">
            <v-list>
                <v-list-tile :to="'/'">
                    <v-list-tile-action>
                        <i class="fas fa-chalkboard-teacher fa-2x"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Panel kibica</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-action>
                                <i class="fas fa-toolbox fa-2x"></i>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Panel administracyjny</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-tile v-for="option in adminOptions" :key="option.name" :to="option.router">
                        <v-list-tile-action>
                            <i :class="option.icon"></i>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{option.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" fixed app :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Pokazy koni</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon large @click="showLogin = true">
                <i class="fas fa-sign-in-alt"></i>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <LoginDialog v-model="showLogin"></LoginDialog>
    </v-app>
</template>

<style lang="less">
    .breadcrumb {
        span {
            margin-left: 10px;
            margin-right: 10px;
        }
        .disabled {
            color: grey;
            cursor: default;
        }

        a {
            text-decoration: none;
        }
    }


</style>

<script lang="ts" src="./App.ts"></script>
