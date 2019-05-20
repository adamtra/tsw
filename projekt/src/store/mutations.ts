import {MutationTree} from 'vuex';
import Judge from '@/types/judge';
import State from '@/types/state';

export const mutations: MutationTree<State> = {
    judgesLoaded(state: State, data: Judge[]) {
        state.judges = data;
    },
};
