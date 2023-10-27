<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn, currentUsername } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header style="padding-bottom: 10px">
    <RouterView />
    <nav>
      <div class="title">
        <RouterLink :to="{ name: 'Home' }">
          <h1><i class="fas fa-pen-nib" style="font-size: 24px"></i> Pen & Pixel</h1>
        </RouterLink>
      </div>
      <ul v-if="isLoggedIn">
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> <i class="fa fa-home"></i> </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> <i class="fa fa-gear"></i> </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Friend' }" :class="{ underline: currentRouteName == 'Friend' }"> <i class="fas fa-user-friends"></i> </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Diary' }" :class="{ underline: currentRouteName == 'Diary' }"> <i class="fas fa-book"></i></RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Profile', params: { username: currentUsername } }" class="Profile"> <i class="fas fa-user-alt"></i> </RouterLink>
        </li>
      </ul>
      <ul v-else>
        <li>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: #e0cdb1;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
