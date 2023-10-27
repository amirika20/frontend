<script setup lang="ts">
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const { currentUsername } = storeToRefs(useUserStore());
const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let commenting = ref("");
let searchAuthor = ref("");
const props = defineProps(["user"]);
const postUser = computed(() => props.user);

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

function updateCommenting(id: string) {
  commenting.value = id;
}

onBeforeMount(async () => {
  if (props.user !== undefined) {
    await getPosts(props.user);
    console.log(props.user);
  } else {
    await getPosts();
  }
  loaded.value = true;
});
</script>

<template>
  <!-- <section v-if="isLoggedIn && props.user === currentUsername">
    <h2>Create a post:</h2>
    <CreatePostForm @refreshPosts="getPosts" />
  </section>
  <section v-if="isLoggedIn && props.user === undefined">
    <h2>Create a post:</h2>
    <CreatePostForm @refreshPosts="getPosts" />
  </section> -->
  <div v-if="props.user === undefined" class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm @getPostsByAuthor="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id && commenting !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" @createComment="updateCommenting" />
      <EditPostForm v-else-if="editing === post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <CreateCommentForm v-else-if="commenting === post._id" :post="post" @refreshPosts="getPosts" @createComment="updateCommenting" @editComments="updateCommenting" />
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
  position: relative;
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
  padding: 3em;
  display: flex;
  padding-bottom: 100px;
  background-color: #e0dfc1;
  z-index: 2;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
