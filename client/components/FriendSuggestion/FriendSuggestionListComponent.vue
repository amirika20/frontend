<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import FriendSuggestionComponent from "./FriendSuggestionComponent.vue";
const { currentUsername } = storeToRefs(useUserStore());
const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let suggestions = ref<Array<Record<string, string>>>([]);

const getSuggestions = async () => {
  let suggestionResults;
  try {
    await fetchy("/api/friendSug", "PATCH", {});
  } catch (_) {
    return;
  }
  try {
    suggestionResults = await fetchy("/api/friendSug", "GET", {});
  } catch {
    return;
  }
  suggestions.value = suggestionResults;
};

onBeforeMount(async () => {
  await getSuggestions();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2>Suggestions:</h2>
  </div>
  <section class="suggestions" v-if="loaded && suggestions.length !== 0">
    <article v-for="suggestion in suggestions" :key="suggestion._id">
      <FriendSuggestionComponent :suggestion="suggestion" />
    </article>
  </section>
  <p v-else-if="loaded">No Friends found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
