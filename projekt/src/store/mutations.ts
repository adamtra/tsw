import {MutationTree} from 'vuex';
import State from '@/types/state';

export const mutations: MutationTree<State> = {
    tokenLoaded(state: State, data: string) {
        state.token = data;
        localStorage.setItem('token', state.token);
    },
    deleteToken(state: State) {
        state.token = null;
        localStorage.removeItem('token');
    },
    themeSelected(state: State, data: boolean) {
        state.darkTheme = data;
        localStorage.setItem('darkTheme', state.darkTheme.toString());
    },
};
