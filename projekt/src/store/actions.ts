import {ActionTree} from 'vuex';
import State from '@/types/state';

export const actions: ActionTree<State, State> = {
    setTheme({commit}, data) {
        commit('themeSelected', data);
    },
};
