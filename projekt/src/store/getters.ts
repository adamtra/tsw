import {GetterTree} from 'vuex';
import Judge from '@/types/judge';
import State from '@/types/state';

const emptyJudge: Judge = {
    id: 0,
    sedzia: '',
    kraj: '',
};

export const getters: GetterTree<State, State> = {
    getJudge(state: State): (id: number) => Judge {
        return (id: number) => {
            const {judges} = state;
            return judges.find((judge) => judge.id === id) || emptyJudge;
        };
    },
};
