import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/products",
    name: "tutorials",
    component: () => import("./components/ProductList.vue"),
  },
  {
    path: "/products/:id",
    name: "product-information",
    component: () => import("./components/ProductInformation.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
