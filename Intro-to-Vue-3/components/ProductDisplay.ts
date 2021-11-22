interface Item {
  id: number;
  color: string;
  image: string;
  onSale: boolean;
  quantity: number;
}

app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img
              :src="image"
              :class="{ 'out-of-stock-img': !inventory }"
              alt=""
            />
            <a :href="url">V-Binded:</a>
          </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inventory > 10">In Stock</p>
    <p v-else-if="inventory <= 10 && inventory">Almost out</p>
    <p v-else>Out of Stock</p>
    <product-details :details="details"></product-details>
    <p>Shipping: {{ shipping }}</p>
    <p v-show="isOnSale">{{ isOnSale }}</p>
        <div
          class="color-circle"
          :key="variant.id"
          :style="{backgroundColor: variant.color}"
          v-for="(variant, index) in variants"
          @mouseover="updateVariant(index)"
        ></div>
        <div v-for="size of sizes">{{ size }}</div>
        <p>{{ description }}</p>
        <button
          class="button"
          :class="{ disabledButton: !inventory }"
          :disabled="!inventory"
          @click="addToCart"
        >
          Add To Cart
        </button>
        <button
          class="button"
          :class="{ disabledButton: !inventory }"
          :disabled="!inventory"
          @click="removeFromCart"
        >
          Remove From Cart
        </button>
      </div>
        </div>
  <review-list v-show="reviews.length" :reviews="reviews"></review-list>
  <review-form @review-submitted="addReview"></review-form>
  </div>`,

  data() {
    return {
      product: "Boots",
      brand: "Vue Mastery",
      description: "These boots were made for walking.",
      selectedVariant: 0,
      url: "http://localhost:8000#v-bind",
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 5232,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          onSale: true,
          quantity: 10,
        },
        {
          id: 4232,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          onSale: false,
          quantity: 0,
        },
      ] as Item[],
      sizes: ["S", "M", "L", "XL", "XXL"],
      reviews: [] as Review[],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index: number) {
      this.selectedVariant = index;
    },
    addReview(review: Review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity;
    },
    isOnSale() {
      return this.variants[this.selectedVariant].onSale
        ? `${this.title} is on Sale!`
        : "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "2.99";
    },
  },
});
