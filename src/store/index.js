import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ActiveID: "",
    activeSlider: false,
    language: "de",
    fileNameMove: "",
    fileID: ""
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
    },
    newMoveFileName(state, newName){
      state.fileNameMove = newName;
    },
    newMoveFileID(state, newID){
      state.fileID = newID;
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
    },
    moveFileMenuName({ commit }, newName){
      commit("newMoveFileName", newName)
    },
    moveFileMenuID({commit}, newID){
      commit("newMoveFileID", newID)
    }
  },
  modules: {}
});
