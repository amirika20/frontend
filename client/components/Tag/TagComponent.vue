<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let tags = ref();

const props = defineProps(["username"]);

async function getTags() {
  let tagResult;
  try {
    tagResult = await fetchy(`/api/tags/${props.username}`, "GET", {});
  } catch (_) {
    return;
  }
  tags.value = tagResult.userTags;
}

onBeforeMount(async () => {
  await getTags();
});
</script>

<template>
  <section>
    <div class="tag-list">
      <p v-for="tag in tags" :key="tag">{{ tag }}</p>
    </div>
  </section>
</template>

<style scoped>
.tag-list {
  white-space: nowrap; /* Prevents tags from wrapping to a new line */
}

.tag-list p {
  display: inline-block; /* Display tags in a horizontal line */
  margin-right: 10px; /* Add spacing between tags (adjust as needed) */
}
</style>
