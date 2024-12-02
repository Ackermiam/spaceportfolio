<template>
  <section class="HomeFour" ref="scene">
    <div
      ref="sceneFour"
      class="Scene"
    ></div>
    <div class="HomeFour__presentation">
      <h2>Mes <br> Projets</h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Logic } from "../three/sceneFour/scene";

const scene = ref();
const sceneFour = ref();
const isSectionVisible = ref(false);
let logic;

const checkVisibility = () => {
  if (!sceneFour.value) return;

  const rect = sceneFour.value.closest(".HomeFour").getBoundingClientRect();

  isSectionVisible.value = rect.top <= 0;
};

onMounted(() => {
  logic = new Logic(scene.value, sceneFour.value);

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkVisibility);
  window.removeEventListener("resize", checkVisibility);
});
</script>

<style scoped>
.HomeFour {
  width: 100vw;
  height: 400vh;
  background: rgb(8, 8, 8);
  position: relative;
  z-index: 3;
}

.HomeFour__presentation {
  font-family: "Mewatonia";
  font-size: 15vw;
  padding: .5em;
  color: rgb(131, 10, 10);
}

h2 {
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0;
}

.Scene {
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  position: absolute;
}

.Scene--fixed {
  position: fixed;
  transition: top 0.3s ease-out;
}

.Scene--absolute {
  position: absolute;
}
</style>
