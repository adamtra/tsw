import {GetterTree} from 'vuex';
import Judge from '@/types/judge';
import State from '@/types/state';
import Horse from '@/types/horse';
import Class from '@/types/class';

export const getters: GetterTree<State, State> = {
    judgeById(state: State): (id: number) => Judge | undefined {
        return (id: number) => {
            return state.judges.find((judge) => judge.id === id);
        };
    },
    judges(state: State): Judge[] {
      return state.judges;
    },
    horseById(state: State): (id: number) => Horse | undefined {
        return (id: number) => {
            return state.horses.find((horse) => horse.id === id);
        };
    },
    horses(state: State): Horse[] {
        return state.horses;
    },
    classById(state: State): (id: number) => Class | undefined {
        return (id: number) => {
            return state.classes.find((classEl) => classEl.id === id);
        };
    },
    classes(state: State): Class[] {
        return state.classes;
    },
    token(state: State): string | null {
      return state.token;
    },
};
