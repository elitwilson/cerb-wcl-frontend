import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/errors/404.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/rankings/aggregate",
      name: "aggregate",
      component: () => import("../views/rankings/RankingsAggregate.vue")
    },
    // Handle errors
    { 
      path: '/404', 
      name: 'notfound',
      component: NotFound 
    },
    { 
      path: "/:catchAll(.*)", 
      redirect: '/404' 
    }
  ],
});

export default router;
