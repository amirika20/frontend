<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import CommentComponent from "../../components/Comment/CommentComponent.vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const loaded = ref(false);
const commenting = ref("");
let comments = ref<Array<Record<string, string>>>([]);
const emit = defineEmits(["refreshPosts"]);

async function getComments() {
  let CommentResults;
  try {
    CommentResults = await fetchy(`/api/comments/target/${props.post._id}`, "GET", {});
  } catch (_) {
    return;
  }
  comments.value = CommentResults;
  emit("refreshPosts");
}

function updateCommenting(id: string) {
  commenting.value = id;
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent :comment="comment" @refreshComments="getComments" @createComment="updateCommenting" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
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
article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.comments {
  background-color: rgb(255, 241, 223);
  padding: 1em;
}
</style>
