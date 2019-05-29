<template>
    <v-app :dark="theme">
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
                <v-list-group v-if="isAuthorized">
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
            <v-menu bottom left :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile>
                        <v-switch v-model="theme" label="Ciemny motyw"></v-switch>
                    </v-list-tile>
                    <v-list-tile>
                        <v-btn v-if="!isAuthorized" color="primary" @click="showLogin = true">
                            <v-icon left>input</v-icon>
                            <span>Zaloguj</span>
                        </v-btn>
                        <v-btn v-else color="primary" @click="logout">
                            <v-icon left>power_settings_new</v-icon>
                            <span>Wyloguj</span>
                        </v-btn>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <LoginDialog v-model="showLogin" @logged="dialogClosed"></LoginDialog>
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

    .gold {
        background-color: gold!important;
        color: black!important;
    }

    .silver {
        background-color: silver!important;
    }

    .bronze {
        background-color: #CD7F32!important;
    }

</style>

<script lang="ts" src="./App.ts"></script>
