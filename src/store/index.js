import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ActiveID: "",
    activeSlider: false,
    language: "de"
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
    },
    changeLanguage(state, newLang){
      state.language = newLang
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
    },
    changeLanguage({ commit }, newLanguage) {
      commit("changeLanguage", newLanguage)
    }
  },
  modules: {}
});
