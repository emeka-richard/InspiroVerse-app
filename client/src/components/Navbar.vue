<template>
  <nav v-if="computedProps.formStatus === true">
    <div class="nav-container">
      <section class="auth-nav-logo">
        <router-link to="/" class="link">
          <h1>{{ navbarContents.logo }}</h1>
        </router-link>
      </section>
      <section>
        <ul v-if="isDropDown" class="auth-link-container">
          <li
            v-if="!computedProps.userStatus"
            v-for="linkItem in navbarContents.authlinks"
            :key="linkItem.name"
            @click="handleRouteLinks(linkItem)"
          >
            {{ linkItem.name }}
          </li>
          <li
            v-if="computedProps.userStatus"
            v-for="linkItem in navbarContents.navlinks"
            :key="linkItem.name"
            @click="handleRouteLinks(linkItem)"
          >
            {{ linkItem.name }}
          </li>
          <li v-if="computedProps.userStatus" @click="logout">Logout</li>
        </ul>
        <ul class="auth-link-container-1">
          <li
            v-if="!computedProps.userStatus"
            v-for="linkItem in navbarContents.authlinks"
            :key="linkItem.name"
            @click="handleRouteLinks(linkItem)"
          >
            {{ linkItem.name }}
          </li>
          <li
            v-if="computedProps.userStatus"
            v-for="linkItem in navbarContents.navlinks"
            :key="linkItem.name"
            @click="handleRouteLinks(linkItem)"
          >
            {{ linkItem.name }}
          </li>
          <li v-if="computedProps.userStatus" @click="logout">Logout</li>
        </ul>
      </section>
      <section class="link-toggler" @click="toggleSVGMenuBar">
        <SvgIcon
          type="mdi"
          :path="svgIconPath"
          size="40px"
          color="var(--bg-color-2)"
        />
      </section>
    </div>
  </nav>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStoreMarker, mdiMenuClose, mdiMenuOpen } from "@mdi/js";
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// const components = defineComponent({ SvgIcon });
// const svgIconLogo = mdiStoreMarker;
let svgIconPath = ref(mdiMenuOpen);
let isDropDown = ref(false);

const computedProps = computed(() => {
  const formStatus = store.getters.getFormStatus;
  const userStatus = store.getters.getUserData;
  const userData = store.getters.getUser
  return { formStatus, userStatus, userData };
});
console.log(computedProps.value.formStatus)

const navbarContents = {
  logo: "InspiroVerse",
  authlinks: [
    { name: "Login", urlName: "login" },
    { name: "Register", urlName: "register" },
  ],
  navlinks: [
    { name: "Dashboard", urlName: "dashboard" },
    { name: "Explore", urlName: "dashboard" },
    { name: "Profile", urlName: "dashboard" },
    { name: "About", urlName: "dashboard" },
    { name: "Contributors", urlName: "dashboard" },
  ],
};

const toggleSVGMenuBar = () => {
  isDropDown.value = !isDropDown.value;
  svgIconPath.value = isDropDown.value ? mdiMenuClose : mdiMenuOpen;
};

const handleRouteLinks = (navItem) => {
  toggleSVGMenuBar();
  store.dispatch("setFormStatus", navItem.urlName);
  router.push({ name: navItem.urlName });
};
// const handleAuthRoute = (navItem) => {
//   toggleSVGMenuBar();
//   store.dispatch("setFormStatus", navItem.urlName);
//   router.push({ name: navItem.urlName });
// };

const logout = () => {
  toggleSVGMenuBar();
  store.dispatch("logout", computedProps.value.userData);
};

// const handleNavRoute = (navItem) => {
//   toggleSVGMenuBar();
//   store.dispatch("setFormStatus", navItem.urlName);
//   router.push({ name: navItem.urlName });
// };
</script>

<style scoped>
/* LAPTOPS & 4K VIEW CSS - NAVBAR */
@media screen and (min-width: 769px) {
  nav {
    /* .nav-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    } */
    .link-toggler {
      display: none;
    }
    .auth-link-container {
      display: none;
    }
    .auth-link-container-1 {
      width: max-content;
      height: max-content;
      list-style: none;
      /* background-color: var(--bg-color-2); */
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      /* padding: 1rem; */
      gap: 1rem;
    }
    .auth-link-container-1 li {
      width: 100%;
      height: max-content;
      padding: 1rem;
      display: flex;
      text-align: start;
      justify-content: start;
      color: var(--bg-color-2);
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
}

/* MOBILE & TABLET VIEW CSS - NAVBAR */
.auth-link-container-1 {
  display: none;
}
nav {
  width: 100%;
  height: auto;
  display: flex;
  /* text-align: center; */
  justify-content: space-between;
  padding: clamp(0.5rem, 3vw, 1rem) clamp(1rem, 5vw, 1.25rem);
  background: transparent;
  /* border-bottom: 1px solid var(--bg-color-3); */
  box-shadow: 0rem 0.0625rem 0.25rem 0.125rem rgba(255, 255, 255, 0.1);
}
.nav-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.link {
  text-decoration: none;
  color: var(--word-color-3);
  font-size: clamp(1rem, 6vw, 2rem);
  font-weight: 500;
  cursor: pointer;
}
.auth-nav-logo {
  padding: 0.25rem;
}

.auth-nav-logo h1 {
  color: var(--bg-color-2);
  font-family: "Euphoria Script";
  cursor: pointer;
}
.auth-nav-logo,
.link-toggler {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: max-content;
  height: max-content;
  cursor: pointer;
}
.auth-link-container {
  width: 200px;
  height: max-content;
  position: absolute;
  top: 5.75rem;
  right: 1rem;
  list-style: none;
  background-color: var(--bg-color-2);
  color: var(--word-color-3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1;
  border-radius: 0.25rem;
  box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgb(0, 0, 0, 0.4);
}
.auth-link-container li {
  width: 100%;
  height: max-content;
  padding: 1rem;
  display: flex;
  text-align: start;
  justify-content: start;
  cursor: pointer;
}
.auth-link-container li:first-child {
  border-bottom: 1px solid grey;
}
.auth-link-container li:last-child {
  border-top: 1px solid grey;
}
</style>
