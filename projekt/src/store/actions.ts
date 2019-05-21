import {ActionTree} from 'vuex';
import {JudgeService} from '@/services/judge-service';
import State from '@/types/state';

export const actions: ActionTree<State, State> = {
    getExternalJudges({commit}) {
        JudgeService.getExternal().then((res) => {
            commit('judgesLoaded', res.data);
        });
    },
    getJudges({commit}) {
      JudgeService.getAll().then((res) => {
          commit('judgesLoaded', res.data);
      });
    },
};
