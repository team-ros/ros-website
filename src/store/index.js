import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        "ActiveID": '',
    },

    mutations: {
        UpdateDiv(state, NewID) {
            state.ActiveID += NewID;
        }
    },
    actions: {
        StartUpdateDiv({ commit }, NewID) {
            commit('UpdateDiv', NewID)
        }
    },
    modules: {}
});
