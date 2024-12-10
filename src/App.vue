<template>
  <div class="App">
    <div v-for="(Scene, index) in scenes" :key="Scene.name" ref="sceneRefs">
      <component :is="Scene" />
    </div>
    <Loading v-if="loading === true"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SceneOne from "./components/SceneOne.vue";
import SceneTwo from "./components/SceneTwo.vue";
import SceneThree from "./components/SceneThree.vue";
import SceneFour from "./components/SceneFour.vue";
import Loading from "./components/Loading/Loading.vue";

const scenes = [SceneOne, SceneTwo, SceneThree, SceneFour];
const loading = ref(true);

window.addEventListener("loading", (e) => {
  loading.value = e.detail;
})
</script>

<style scoped>
.App {
  position: relative;
}
</style>
