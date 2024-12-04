<template>
  <div>
    <div v-for="(Scene, index) in scenes" :key="Scene.name" ref="sceneRefs">
      <component :is="Scene" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SceneOne from "./components/SceneOne.vue";
import SceneTwo from "./components/SceneTwo.vue";
import SceneThree from "./components/SceneThree.vue";
import SceneFour from "./components/SceneFour.vue";

const scenes = [SceneOne, SceneTwo, SceneThree, SceneFour];
</script>
