import {ActionTree} from 'vuex';
import Judge from '@/types/judge';
import {JudgeService} from '@/services/judge-service';
import State from '@/types/state';

export const actions: ActionTree<State, State> = {
    getDefaultJudges({commit}) {
        JudgeService.get().then((res) => {
            commit('judgesLoaded', res.data);
        });
    },
};
