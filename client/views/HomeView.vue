<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import LoginView from "./LoginView.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
    </section>
    <!-- <a><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0sYNNC28bLJ8KkBodlS676Hk1JojidT8irbWoyuHx4IBJ2baPaIURfYJTAPssAgjMabA&usqp=CAU" /></a> -->
    <PostListComponent v-if="isLoggedIn" />
    <LoginView v-else />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
