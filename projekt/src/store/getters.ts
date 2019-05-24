import {GetterTree} from 'vuex';
import State from '@/types/state';

export const getters: GetterTree<State, State> = {
    token(state: State): string | null {
      return state.token;
    },
    darkTheme(state: State): boolean {
        return state.darkTheme;
    },
};
