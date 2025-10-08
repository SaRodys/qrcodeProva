import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    arrayCodes: [],
  },
  getters: {
    arrayCodes: (state) => state.arrayCodes,
  },
  mutations: {
    IMPORT_CODES(state, arrayCodes) {
      state.arrayCodes = arrayCodes;
    },
    ADD_USER(state, user) {
      state.arrayCodes.push(user);
    },
    UPDATE_USER(state, { index, user }) {
      state.arrayCodes.splice(index, 1, user);
    },
  },
  actions: {
    async codesdb({ commit }) {
      const response = await axios.get("http://localhost:4000/users");
      commit("IMPORT_CODES", response.data);
    },
    async addUser({ commit }, user) {
      const response = await axios.post("http://localhost:4000/users", user);
      commit("ADD_USER", response.data);
    },
    async updateUser({ commit }, { qr_code, updatedFields, index }) {
      // Chiama il backend
      const response = await axios.put(
        `http://localhost:4000/users/${qr_code}`,
        updatedFields
      );

      // Aggiorna lo store
      commit("UPDATE_USER", { index, user: response.data });
    },
  },
});
