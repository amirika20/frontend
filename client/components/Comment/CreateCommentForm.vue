<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["comment", "post"]);
const content = ref("");
const emit = defineEmits(["createComment", "refreshPosts", "editComments"]);

const createComment = async (content: string) => {
  try {
    await fetchy("/api/comments", "POST", {
      body: { content: content, target: props.post._id },
    });
  } catch (_) {
    return;
  }
  emit("createComment");
};
</script>

<template>
  <form @submit.prevent="createComment(content)">
    <p class="author">{{ props.post.author }}</p>
    <p>{{ props.post.content }}</p>
    <textarea id="content" v-model="content" placeholder="Comment!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Post</button></li>
        <li><button class="btn-small pure-button" @click="emit('editComments')">Cancel</button></li>
      </menu>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
