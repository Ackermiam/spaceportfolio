<template>
  <div>
    <div v-for="(Scene, index) in scenes" :key="Scene.name" ref="sceneRefs">
      <component :is="Scene" v-if="index <= activeScene" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SceneOne from "./components/SceneOne.vue";
import SceneTwo from "./components/SceneTwo.vue";
import SceneThree from "./components/SceneThree.vue";
import SceneFour from "./components/SceneFour.vue";

const activeScene = ref(0);
const scenes = [SceneOne, SceneTwo, SceneThree, SceneFour];
const sceneRefs = ref([]);
let observer: IntersectionObserver;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && activeScene.value < scenes.length - 1) {
          activeScene.value++;
        }
      });
    },
    { threshold: 0.5 }
  );

  if (sceneRefs.value.length > 0) {
    observer.observe(sceneRefs.value[sceneRefs.value.length - 1]);
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
