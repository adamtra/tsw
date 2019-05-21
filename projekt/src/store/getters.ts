import {GetterTree} from 'vuex';
import Judge from '@/types/judge';
import State from '@/types/state';

const emptyJudge: Judge = {
    id: 0,
    sedzia: '',
    kraj: '',
};

export const getters: GetterTree<State, State> = {
    judgeById(state: State): (id: number) => Judge {
        return (id: number) => {
            return state.judges.find((judge) => judge.id === id) || emptyJudge;
        };
    },
    token(state: State): string | null {
      return state.token;
    },
};
