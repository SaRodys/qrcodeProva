import { createRouter, createWebHistory } from "vue-router";
import ElencoQr from "../views/ElencoCodici.vue";
import NuovoUtente from "../views/NuovoUtente.vue";

const routes = [
  {
    path: "/",
    name: "codici",
    component: ElencoQr,
  },
  {
    path: "/nuovoUtente",
    name: "nuovoUtente",
    component: NuovoUtente,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
