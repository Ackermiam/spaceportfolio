<template>
  <section class="HomeThree" ref="scene">
    <div
      ref="sceneThree"
      class="Scene"
      :class="isSectionVisible ? 'Scene--fixed' : 'Scene--absolute'"
    ></div>
    <div class="HomeThree__presentation">
      <h2>Mon <br> travail</h2>
    </div>
    <div class="HomeThree__nespresso">
      <h2>Chez <br> Nespresso</h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Logic } from "../three/sceneThree/scene";

const sceneThree = ref();
const scene = ref();
const isSectionVisible = ref(false);
let logic: Logic;

const checkVisibility = () => {
  if (!sceneThree.value) return;

  const rect = sceneThree.value.closest('.HomeThree').getBoundingClientRect();

  isSectionVisible.value = (
    rect.top <= 0
  );
};

onMounted(() => {
  logic = new Logic(scene.value, sceneThree.value);

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);

  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkVisibility);
  window.removeEventListener('resize', checkVisibility);
});
</script>

<style scoped>
.HomeThree {
  width: 100vw;
  height: 500vh;
  background: rgb(126, 78, 24);
  position: relative;
  z-index: 3;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0px -7px 20px rgba(0,0,0,0.22);
}

.HomeThree__presentation {
  position: absolute;
  font-family: "Mewatonia";
  font-size: 10vw;
  padding: 1em;
  color: rgb(92, 57, 18);
  z-index: 3;
}
.HomeThree__nespresso {
  position: absolute;
  font-family: "Mewatonia";
  font-size: 8vw;
  padding: 1em;
  color: rgb(158, 99, 32);
  z-index: 1;
  right: 0;
  top: 600px;
  text-align: right;
}

.Scene {
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
}

.Scene--fixed {
  position: fixed;
  transition: top 0.3s ease-out;
}

.Scene--absolute {
  position: absolute;
}

h2 {
  font-family: "Mewatonia";
  line-height: 0.8em;
  margin: 0;
}
</style>