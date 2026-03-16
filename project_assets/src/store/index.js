import { createStore } from 'vuex'

export default createStore({
  state: {
    //data
    products: [], //All Products
    product: null //Single Product
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_PRODUCT(state, product) {
      state.product = product
    }
  },
  actions: {
    //All Products
    async getProducts({ commit }) {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      commit('SET_PRODUCTS', data.products)
    },
    //Prodct Details
    async getProduct({ commit }, id) {
      const res = await fetch('https://dummyjson.com/products/' + id)
      const data = await res.json()
      commit('SET_PRODUCT', data)
    }
  },
  modules: {
  }
})
