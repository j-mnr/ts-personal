interface Review {
  name: string;
  review: string;
  rating: number;
}

app.component("review-form", {
  template: `
    <form  class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>
      <label for="name"></label>
      <input name="name" type="text" id="name" v-model="name">
      <label for="review"></label>
      <textarea name="review" id="review" v-model="review" cols="30" rows="10"></textarea>
      <label for="rating"></label>
      <select name="rating" id="rating" v-model.number="rating">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>

      <input class="button" type="submit" value="Submit">
    </form>
  `,
  data() {
    return <Review>{
      name: "",
      review: "",
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      if (!this.name || !this.review || !this.rating) {
        alert("Review is incomplete. Please fill out every field.");
        return;
      }

      let productReview: Review = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit("review-submitted", productReview);

      this.name = "";
      this.review = "";
      this.rating = null;
    },
  },
});
