<script lang="ts">
// XXX: Doesn't work....
export default {
  layout: "custom",
};
</script>

<script setup lang="ts">
// const {data}: {data: unknown} = await useFetch("/api/hello?search=bash", {})
// const {data}: {data: unknown} = await useAsyncData("searchData",
//   (): Promise<unknown> => $fetch("/api/hello?search=mash"))
import {ref} from "vue";
let searchText = ref("");
let myData = ref([]) as any;

async function searchForStuff() {
  const data = await fetch(`/api/hello?search=${searchText.value}`);
  const json = await data.json();
  console.log("JSON:", json);
  myData.value = json;
}
</script>

<template>
  <div>
    <form @submit.prevent="searchForStuff">
      <input type="text" name="search" id="search" v-model="searchText" />
      <button>Search for TV Shows</button>
    </form>
    <div class="stuff">
      <div v-for="show in myData">
        <img :src="show.show?.image?.medium" alt="TV Show Image" />
      </div>
    </div>
  </div>
</template>

<style>
.stuff {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>
