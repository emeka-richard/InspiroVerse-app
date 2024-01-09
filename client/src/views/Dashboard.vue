<template>
  <section class="dashboard-wrapper">
    <section class="dashboard-content-container">
      <section class="dashboard-wecome-details">
        <div class="user-img-tag">
          <img :src="avatar" alt="user-img" />
        </div>
        <h3 class="dashboard-title">
          {{ welcomeTxt }} {{ computedStoreData.firstName }}.
        </h3>
      </section>
      <section class="dashboard-time-holder">
        <h3>{{ today }}</h3>
      </section>
    </section>
  </section>
</template>

<script setup>
// import store from '@/vuex/store';
import { computed } from "vue";
import { useStore } from "vuex";
import maleIMG from "@/assets/imgs/h-img.png";
import femaleIMG from "@/assets/imgs/w-img.png";
const store = useStore();

const today = new Date().toUTCString().slice(0, 17) + " (GMT)";

const computedStoreData = computed(() => {
  const userData = store.getters.getUser;
  const firstName = userData.name.split(" ")[0];
  const loggedIn = userData.loggedIn;
  return { userData, firstName, loggedIn };
});

const welcomeTxt =
  computedStoreData.value.loggedIn === true ? "Welcome back, " : "Welcome, ";
console.log(welcomeTxt, computedStoreData.value.loggedIn === false);
const avatar =
  computedStoreData.value.userData.gender === "Male" ? maleIMG : femaleIMG;
</script>

<style scoped>
@media screen and (min-width: 769px) {
  .dashboard-wrapper {
    .dashboard-content-container {
      width: 100%;
      height: max-content;
      margin: 0.25rem auto;
      background: var(--bg-color-2);
      padding: 1rem 1.5rem;
      box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgb(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
  }
}

.dashboard-wrapper {
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  background-color: var(--bg-color-6);
  display: flex;
  justify-content: center;
}
.dashboard-content-container {
  width: 100%;
  height: max-content;
  margin: 0.25rem auto;
  background: var(--bg-color-2);
  padding: 1rem 1.5rem;
  box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgb(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.user-img-tag {
  img {
    outline: 4px solid grey;
    border: 4px solid var(--word-color-4);
    border-radius: 50%;
    width: clamp(50px, 4vw, 100px);
    height: clamp(50px, 4vw, 100px);
  }
}
.dashboard-wecome-details {
  width: 100%;
  height: auto;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-start;
  gap: 1.25rem;
}

.dashboard-title {
  width: 100%;
  font-size: clamp(1.25rem, 3vw, 2.125rem);
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* text-align: justify; */
}
.dashboard-time-holder {
  width: 50%;
  height: max-content;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.dashboard-time-holder {
  font-size: clamp(1rem, 3vw, 2.125rem);
  font-weight: 300;
}
</style>
