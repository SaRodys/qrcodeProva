<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h1>Elenco Utenti</h1>

    <!-- Barra di ricerca -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Cerca per nome o cognome"
      class="form-control mb-3"
    />

    <button @click="loadCodes" class="btn btn-primary mb-3">Carica utenti</button>

    <div v-if="filteredUtenti.length" class="user-list">
      <UserCard
        v-for="(utente, index) in filteredUtenti"
        :key="index"
        :utente="utente"
        :index="index"
      />
    </div>

    <p v-else>Nessun utente trovato.</p>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import { mapGetters, mapActions } from "vuex";
import UserCard from "@/components/UserCard.vue";

export default {
  name: "ElencoUtenti",
  components: { UserCard },
  data() {
    return {
      searchTerm: "", // <-- variabile per la ricerca
    };
  },
  computed: {
    ...mapGetters(["arrayCodes"]),
    utenti() {
      return this.arrayCodes;
    },
    filteredUtenti() {
      // Filtra utenti per nome o cognome in base alla barra di ricerca
      const term = this.searchTerm.toLowerCase();
      return this.utenti.filter(
        (u) =>
          u.nome.toLowerCase().includes(term) ||
          u.cognome.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    ...mapActions(["codesdb"]),
    loadCodes() {
      this.codesdb();
    },
  },
  created() {
    this.loadCodes();
  },
};
</script>
<!-- eslint-disable prettier/prettier -->

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
