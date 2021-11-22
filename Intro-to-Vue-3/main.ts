const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    addToCart(id: number) {
      this.cart.push(id);
    },
    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.id === id);
    }
  },
});
