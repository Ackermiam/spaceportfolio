<template>
  <section class="HomeThree" ref="scene">
    <div
      ref="sceneThree"
      class="Scene"
      :class="isSectionVisible ? 'Scene--fixed' : 'Scene--absolute'"
    ></div>
    <div class="HomeThree__title">
      <h2>
        Mon <br />
        travail
      </h2>
    </div>
    <div class="HomeThree__nespresso">
      <h2>
        Chez <br />
        Nespresso
      </h2>
    </div>
    <div class="HomeThree__presentation">
      <p>
        Développeur travaillant essentiellement avec Vue.js et Nuxt.js, je
        conçois des solutions sur mesure pour répondre aux besoins de mon client
        <em>Nespresso</em> sur leur site e-commerce. Mon travail se concentre
        sur la création de pages impactantes pour les lancements de produits
        <em>(Vertuo Pop)</em>, la conception de pages événementielles pour des
        campagnes telles que <em>Black Friday 2022 & 2023</em>, la nouvelle
        gamme <em>Compostable</em>, les collaborations avec
        <em>Jean Imbert</em>, <em>Pierre Hermé</em>, <em>Mory Sacko</em>, ainsi
        que le développement de la nouvelle <em>page d'accueil 2024</em>.
      </p>
    </div>
    <div class="HomeThree__presentationTwo">
      <p>
        Pour améliorer <em>l'efficacité</em> des équipes et fluidifier les
        processus, j'ai également développé un <em>CMS</em>, permettant aux
        différents intervenants de collaborer efficacement et de gagner en
        autonomie. Mon objectif est de créer des expériences utilisateur
        <em>optimales</em> tout en garantissant une
        <em>simplicité</em> d'utilisation.
      </p>
    </div>

    <div class="HomeThree__presentationThree">
      <img src=""/>
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

  const rect = sceneThree.value.closest(".HomeThree").getBoundingClientRect();

  isSectionVisible.value = rect.top <= 0;
};

onMounted(() => {
  logic = new Logic(scene.value, sceneThree.value);

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
.HomeThree {
  width: 100vw;
  height: 1000vh;
  background: rgb(126, 78, 24);
  position: relative;
  z-index: 3;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0px -7px 20px rgba(0, 0, 0, 0.22);
  overflow-x: hidden;
}

.HomeThree__title,
.HomeThree__nespresso,
.HomeThree__presentation,
.HomeThree__presentationTwo {
  position: absolute;
  padding: 10em;
}

.HomeThree__title,
.HomeThree__nespresso {
  z-index: 3;
}


.HomeThree__presentation,
.HomeThree__presentationTwo {
  z-index: 1;
}

.HomeThree__presentation {
  top: 150vh;
}

.HomeThree__presentationTwo {
  top: 250vh;
  text-align: right;
  right: 0;
}

.HomeThree__presentationThree {
  top: 325vh;
}

.HomeThree__title {
  color: rgb(92, 57, 18);
}

.HomeThree__nespresso {
  color: rgb(158, 99, 32);
  right: 0;
  top: 65vh;
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
  font-size: 14vw;
  filter: drop-shadow(0 0 10px #00000021);
}

p {
  font-size: 1.8vw;
  max-width: 500px;
  font-family: "Archivo";
  padding: 1em;
  color: rgb(77, 50, 19);
  border-top: 4px solid rgb(77, 50, 19);
}

em {
  color: rgb(33, 155, 149);
}

@media (max-width: 900px) {
  h2 {
    font-family: "Mewatonia";
    line-height: 0.8em;
    margin: 0;
    font-size: 18vw;
  }

  p {
    font-size: 5vw;
    text-align: left;
  }

  .HomeThree__title,
  .HomeThree__nespresso,
  .HomeThree__presentation,
  .HomeThree__presentationTwo {
    padding: 2em;
  }

  .HomeThree__presentation,
.HomeThree__presentationTwo {
  z-index: 3;
}
}
</style>
