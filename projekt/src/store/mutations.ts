import {MutationTree} from 'vuex';
import Judge from '@/types/judge';
import State from '@/types/state';
import Horse from '@/types/horse';
import Class from '@/types/class';

export const mutations: MutationTree<State> = {
    judgesLoaded(state: State, data: Judge[]) {
        state.judges = data;
    },
    horsesLoaded(state: State, data: Horse[]) {
        state.horses = data;
    },
    classesLoaded(state: State, data: Class[]) {
        state.classes = data;
    },
};
