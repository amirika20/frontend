<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import PointComponent from "../components/Point/PointComponent.vue";
import PostListComponent from "../components/Post/PostListComponent.vue";
import TagComponent from "../components/Tag/TagComponent.vue";
const { currentUsername } = storeToRefs(useUserStore());
const { updateSession } = useUserStore();

void updateSession();
</script>

<template>
  <main>
    <section class="header">
      <div class="name-point">
        <p class="name">{{ $route.params.username }}</p>
        <p class="point" v-if="currentUsername === $route.params.username"><PointComponent /></p>
      </div>
      <div class="tags">
        <TagComponent :username="$route.params.username" />
      </div>
    </section>

    <PostListComponent style="padding-top: 100px" :user="$route.params.username" />
  </main>
</template>

<style scoped>
@import "@/assets/profile.css";
</style>
