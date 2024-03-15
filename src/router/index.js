import { createRouter, createWebHistory } from "vue-router";
import FilePage from "@/pages/file.vue";
import DataPage from "@/pages/data.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: FilePage,
    },
    {
      name: "data",
      path: "/data",
      component: DataPage,
    },
    {
      name: "analysis",
      path: "/analysis",
      component: DataPage,
    },
  ],
});

export default router;
