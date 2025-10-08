<!-- eslint-disable prettier/prettier -->
<template>
  <main class="py-5">
    <div class="container mt-5">
      <h1>Aggiungi un nuovo utente</h1>
      <h4 class="mt-3">
        Inserisci i dati dell'utente e verrà generato un QR code automaticamente
      </h4>
      <div class="row">
        <div class="col-md-7">
          <form class="row g-4" @submit.prevent="submitUser">
            <div class="col-md-6">
              <label class="form-label" for="nome">Nome</label>
              <input
                v-model="user.nome"
                class="form-control"
                id="nome"
                required
              />
            </div>
            <div class="col-md-6">
              <label class="form-label" for="cognome">Cognome</label>
              <input
                v-model="user.cognome"
                class="form-control"
                id="cognome"
                required
              />
            </div>
           <div class="col-md-6">
              <label class="form-label" for="data_nascita">Data di nascita</label>
              <input
                v-model="user.data_nascita"
                type="date"
                class="form-control"
                id="data_nascita"
                required
              />
            </div>
            <div class="col-12 text-end">
              <button type="submit" class="btn btn-primary">Aggiungi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  data() {
    return {
      user: {
        nome: "",
        cognome: "",
        data_nascita: "",
        qr_code: "",
        spese_fatte: 0,
      },
      lastAdded: {},
    };
  },
  methods: {
  formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("it-IT"); // formato gg/mm/aaaa
    },
    generateQR() {
      // Genera un ID unico tipo UUID semplice
      return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    async submitUser() {
        const newUser = {
            ...this.user,
            qr_code: this.generateQR()
        };

        // Salva nel backend + aggiorna Vuex
        await this.$store.dispatch("addUser", newUser);

        this.lastAdded = newUser;
        this.showAlert = true;

        // Reset form
        this.user = { nome: "", cognome: "", data_nascita: "", qr_code: "", spese_fatte: 0 };
        }
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-alert {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}
</style>
