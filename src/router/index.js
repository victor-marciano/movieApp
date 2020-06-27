import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Movie from '../views/Movie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/popular',
    name: 'popular',
    component: () => import('../views/Home.vue'),
    props: true,
    meta: {
      title: 'Movie hub | Sua plataforma de filmes'
    }
  },
  {
    path: '/top',
    name: 'top',
    component: () => import('../views/Home.vue'),
    props: true,
    meta: {
      title: 'Movie hub | Sua plataforma de filmes'
    }
  },
  {
    path: '/now',
    name: 'now',
    component: () => import('../views/Home.vue'),
    props: true,
    meta: {
      title: 'Movie hub | Sua plataforma de filmes'
    }
  },
  {
    path: '/upcoming',
    name: 'upcoming',
    component: () => import('../views/Home.vue'),
    props: true,
    meta: {
      title: 'Movie hub | Sua plataforma de filmes'
    }
  },
  {
    path: '/movie/:movie',
    name: 'movie',
    component: () => import('../views/Movie.vue'),
    meta: {
      title: 'Movie hub | Sua plataforma de filmes'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  next();
});

export default router
