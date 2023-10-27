<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import CreatePostForm from "../components/Post/CreatePostForm.vue";
const { currentUsername } = storeToRefs(useUserStore());
const { updateSession } = useUserStore();

void updateSession();
</script>

<template>
  <main>
    <section>
      <div class="diary">
        <CreatePostForm />
      </div>
    </section>
  </main>
</template>

<style scoped>
.diary {
  margin: 100px;
}
</style>
