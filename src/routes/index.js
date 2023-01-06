import { createRouter, createWebHashHistory } from "vue-router";
import Editor from "../pages/Editor.vue";
import Home from "../pages/Home.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/editor/:theme/:lang/", component: Editor },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
