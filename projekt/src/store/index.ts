import Vue from 'vue';
import Vuex from 'vuex';
import {actions} from '@/store/actions';
import {getters} from '@/store/getters';
import {mutations} from '@/store/mutations';
import State from '@/types/state';

Vue.use(Vuex);

export const state: State = {
    judges: [],
    horses: [],
    classes: [],
};

export default new Vuex.Store<State>({
    state,
    actions,
    getters,
    mutations,
});
