<!-- eslint-disable prettier/prettier -->
<template>
  <div :class="['utente-card', { 'max-spese': spese_fatte >= 10 }]">
    <p><strong>Nome:</strong> {{ utente.nome }}</p>
    <p><strong>Cognome:</strong> {{ utente.cognome }}</p>
    <p><strong>Data di nascita:</strong> {{ formatDate(utente.data_nascita) }}</p>
    <p><strong>QR Code:</strong> {{ utente.qr_code }}</p>
    <!-- Banner se spese >= 10 -->
    <div v-if="spese_fatte >= 10" class="banner">
      10 spese raggiunte!
    </div>
    <qrcode-vue
      :value="utente.qr_code"
      :size="100"
      level="M"
      style="margin: 10px 0"
    />
    <p>
      <strong>Spese fatte:</strong>
      <span>{{ spese_fatte }}</span>
    </p>
    <div class="buttons">
      <button
        @click="incrementSpese"
        class="btn btn-sm btn-secondary"
        :disabled="spese_fatte >= 10"
      >
        +1
      </button>
      <button @click="saveSpese" class="btn btn-sm btn-primary">Salva</button>
      <!-- Bottone reset se spese >= 10 -->
      <button
        v-if="spese_fatte >= 10"
        @click="resetSpese"
        class="btn btn-sm btn-warning"
      >
        Reset
      </button>
    </div>
  </div>
</template>
<!--eslint-disable prettier/prettier -->
<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "UserCard",
  components: { QrcodeVue },
  props: {
    utente: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  data() {
    return {
      spese_fatte: this.utente.spese_fatte
        ? Number(this.utente.spese_fatte)
        : 0,
    };
  },
  methods: {
    incrementSpese() {
      if (this.spese_fatte < 10) this.spese_fatte += 1;
    },
    async saveSpese() {
      await this.$store.dispatch("updateUser", {
        qr_code: this.utente.qr_code,
        updatedFields: { spese_fatte: this.spese_fatte },
        index: this.index,
      });
      alert("Spese aggiornate correttamente!");
    },
    async resetSpese() {
      this.spese_fatte = 0;
      await this.saveSpese(); // salva anche nel backend/Vuex
    },
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear());
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
<!--eslint-disable prettier/prettier -->
<style scoped>
.utente-card {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
  background-color: #fafafa;
  position: relative;
  transition: background-color 0.3s;
}

/* Cambia colore se spese >= 10 */
.utente-card.max-spese {
  background-color: #d4edda; /* verde chiaro */
  border-color: #28a745;
}

/* Banner sopra al QR code */
.banner {
  background-color: #ffc107;
  color: #212529;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
