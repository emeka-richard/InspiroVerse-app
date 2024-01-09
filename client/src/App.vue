<template>
  <main>
    <Navbar />
    <RouterView />
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();

onBeforeMount(() => {
  const userProp = localStorage.getItem("user");
  const formStatus = localStorage.getItem("isOpenForm");
  const countryData = localStorage.getItem("countries");
  if (userProp) {
    const userDataJSON = JSON.parse(userProp);
    store.commit("SET_USER_DATA", userDataJSON);
  }
  if (formStatus === "false") {
    store.commit("SET_FORM", "login");
  }
  if(countryData){
    store.commit("SET_COUNTRY_DATA", JSON.parse(countryData))
  } else {
    store.dispatch("initiateCountryStat")
  }
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch("logout");
      }
      return Promise.reject(error);
    }
  );
});
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* max-width: 1000px; */
  height: 100vh;
  background: var(--word-color-4);
}
</style>
