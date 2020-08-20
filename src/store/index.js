import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ActiveID: "",
    activeSlider: false
  },

  mutations: {
    UpdateDiv(state, NewID) {
      state.ActiveID += NewID;
    },
    updateAccountSliderState(state) {
      state.activeSlider = false;
    },
    loadSliderActive(state) {
      state.activeSlider = true;
    }
  },
  actions: {
    StartUpdateDiv({ commit }, NewID) {
      commit("UpdateDiv", NewID);
    },
    startUpdateAccountSliderState({ commit }) {
      commit("updateAccountSliderState");
    },
    loadSlider({ commit }) {
      commit("loadSliderActive");
    }
  },
  modules: {}
});
