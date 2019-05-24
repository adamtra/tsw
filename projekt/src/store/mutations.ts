import {MutationTree} from 'vuex';
import State from '@/types/state';

export const mutations: MutationTree<State> = {
    tokenLoaded(state: State, data: string) {
        state.token = data;
    },
    themeSelected(state: State, data: boolean) {
        state.darkTheme = data;
        localStorage.setItem('darkTheme', state.darkTheme.toString());
    },
};
