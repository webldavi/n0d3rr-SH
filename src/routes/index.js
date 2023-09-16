import { createRouter, createWebHashHistory } from "vue-router";
import Editor from "../pages/Editor.vue";
import Home from "../pages/Home.vue";
import Snap from '../pages/Snap.vue'
const routes = [
  { path: "/", component: Home },
  { path: "/editor/:theme/:lang/", component: Editor },
  { path: "/snap", component: Snap },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
