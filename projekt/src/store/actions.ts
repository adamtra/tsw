import {ActionTree} from 'vuex';
import {JudgeService} from '@/services/judge-service';
import State from '@/types/state';
import {HorseService} from '@/services/horse-service';
import {ClassService} from "@/services/class-service";

export const actions: ActionTree<State, State> = {
    getJudges({commit}) {
      JudgeService.getAll().then((res) => {
          commit('judgesLoaded', res.data);
      });
    },
    getHorses({commit}) {
        HorseService.getAll().then((res) => {
            commit('horsesLoaded', res.data);
        });
    },
    getClasses({commit}) {
        ClassService.getAll().then((res) => {
            commit('classesLoaded', res.data);
        });
    },
};
