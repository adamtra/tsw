import {ActionTree} from 'vuex';
import {JudgeService} from '@/services/judge-service';
import State from '@/types/state';

export const actions: ActionTree<State, State> = {
    getJudges({commit}) {
      JudgeService.getAll().then((res) => {
          commit('judgesLoaded', res.data);
      });
    },
};
