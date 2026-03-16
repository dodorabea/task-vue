import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'register',
    component: () => import('../views/register.vue'),
    meta: {
      title: 'register',
      layout: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login',
      layout: false
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProdctsPage.vue'),
    meta: {
      title: 'Products Page',
      layout: true
    }
  },
  {
    path: '/products/:id',
    name: 'productDetails',
    component: () => import('../views/ProductPageDetails.vue'),
    meta: {
      title: 'Products Details Page',
      layout: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
