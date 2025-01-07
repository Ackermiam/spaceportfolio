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
        <em>Nespresso</em> sur leur site e-commerce.
      </p>
    </div>
    <div class="HomeThree__presentationOne">
      <p>
        Mon travail se concentre sur la création de pages impactantes pour les
        lancements de produits
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
      <img
        src="/assets/mory.png"
        class="HomeThree__presentationThree__desktop"
      />
      <img
        src="/assets/morymobile.png"
        class="HomeThree__presentationThree__mobile"
      />
    </div>

    <div class="HomeThree__presentationFour">
      <img src="/assets/pop.png" class="HomeThree__presentationFour__desktop" />
      <img
        src="/assets/popmobile.png"
        class="HomeThree__presentationFour__mobile"
      />
    </div>

    <div class="HomeThree__presentationFive">
      <img
        src="/assets/home.png"
        class="HomeThree__presentationFive__desktop"
      />
      <img
        src="/assets/homemob.png"
        class="HomeThree__presentationFive__mobile"
      />
    </div>

    <div class="HomeThree__end">
      <h2>
        Et bien <br />
        plus <br />
        encore !
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Logic } from "../three/sceneThree/scene";

const sceneThree = ref();
const scene = ref();
const isSectionVisible = ref(false);
let logic: Logic | null = null;

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
  height: 800vh;
  background-color: hsla(25, 56%, 15%, 1);
  background-image: radial-gradient(
      at 7% 91%,
      hsla(0, 40%, 11%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 25% 3%, hsla(18, 52%, 14%, 1) 0px, transparent 50%),
    radial-gradient(at 62% 91%, hsla(6, 50%, 12%, 1) 0px, transparent 50%),
    radial-gradient(at 5% 23%, hsla(15, 55%, 14%, 1) 0px, transparent 50%),
    radial-gradient(at 77% 52%, hsla(21, 50%, 19%, 1) 0px, transparent 50%),
    radial-gradient(at 66% 61%, hsla(18, 79%, 19%, 1) 0px, transparent 50%),
    radial-gradient(at 39% 86%, hsla(14, 47%, 21%, 1) 0px, transparent 50%),
    radial-gradient(at 91% 58%, hsla(30, 65%, 15%, 1) 0px, transparent 50%),
    radial-gradient(at 12% 55%, hsla(27, 46%, 20%, 1) 0px, transparent 50%),
    radial-gradient(at 39% 55%, hsla(27, 100%, 16%, 1) 0px, transparent 50%),
    radial-gradient(at 83% 92%, hsla(21, 53%, 15%, 1) 0px, transparent 50%),
    radial-gradient(at 89% 20%, hsla(15, 49%, 23%, 1) 0px, transparent 50%),
    radial-gradient(at 44% 36%, hsla(15, 48%, 28%, 1) 0px, transparent 50%),
    radial-gradient(at 74% 29%, hsla(18, 77%, 29%, 1) 0px, transparent 50%),
    radial-gradient(at 61% 10%, hsla(24, 68%, 15%, 1) 0px, transparent 50%),
    radial-gradient(at 16% 32%, hsla(19, 33%, 22%, 1) 0px, transparent 50%),
    radial-gradient(at 26% 50%, hsla(22, 59%, 19%, 1) 0px, transparent 50%),
    radial-gradient(at 31% 14%, hsla(18, 79%, 18%, 1) 0px, transparent 50%);
  position: relative;
  z-index: 3;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0px -7px 20px rgba(0, 0, 0, 0.22);
  overflow-x: hidden;
}

.HomeThree__title,
.HomeThree__end,
.HomeThree__nespresso,
.HomeThree__presentation,
.HomeThree__presentationOne,
.HomeThree__presentationTwo,
.HomeThree__presentationFour,
.HomeThree__presentationFive,
.HomeThree__presentationThree {
  position: absolute;
  padding: 10em;
}

.HomeThree__title,
.HomeThree__end,
.HomeThree__nespresso {
  z-index: 3;
  filter: drop-shadow(0 0 10px #0000004f);
}

.HomeThree__presentation,
.HomeThree__presentationOne,
.HomeThree__presentationTwo {
  z-index: 3;
}

.HomeThree__presentation {
  top: 175vh;
}

.HomeThree__presentationOne {
  top: 320vh;
  text-align: right;
  right: 0;
}

.HomeThree__presentationTwo {
  top: 490vh;
}

.HomeThree__presentationThree {
  top: 235vh;
}

.HomeThree__end {
  top: 660vh;
}

.HomeThree__presentationThree img,
.HomeThree__presentationFour img,
.HomeThree__presentationFive img {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0px -7px 20px rgba(0, 0, 0, 0.22);
  border-radius: 16px;
  width: 100%;
}

.HomeThree__presentationFour {
  top: 405vh;
}

.HomeThree__presentationFive {
  top: 570vh;
  z-index: 3;
}

.HomeThree__presentationFour__mobile,
.HomeThree__presentationFive__mobile,
.HomeThree__presentationThree__mobile {
  display: none;
}
.HomeThree__presentationFour__desktop,
.HomeThree__presentationFive__desktop,
.HomeThree__presentationThree__desktop {
  display: block;
}

.HomeThree__title,
.HomeThree__end,
.HomeThree__nespresso {
  color: rgb(235, 139, 31);
}

.HomeThree__nespresso {
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
}

p {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  font-size: 2vw;
  max-width: 500px;
  font-family: "Archivo";
  padding: 1em;
  color: rgb(202, 202, 202);
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

  .HomeThree {
    display: flex;
    justify-content: center;
  }

  .HomeThree__nespresso {
    right: auto;
  }

  .HomeThree__title h2 {
    font-size: 25vw;
  }

  .HomeThree__nespresso,
  .HomeThree__title,
  .HomeThree__end {
    text-align: center;
  }

  p {
    font-size: 5vw;
    text-align: left;
  }

  .HomeThree__title,
  .HomeThree__end,
  .HomeThree__nespresso,
  .HomeThree__presentation,
  .HomeThree__presentationOne,
  .HomeThree__presentationThree,
  .HomeThree__presentationFour,
  .HomeThree__presentationFive,
  .HomeThree__presentationTwo {
    padding: 2em;
  }

  .HomeThree__presentationOne {
    top: 315vh;
  }
  .HomeThree__presentationFour {
    top: 400vh;
  }
  .HomeThree__presentationTwo {
    top: 485vh;
  }

  .HomeThree__presentation,
  .HomeThree__end,
  .HomeThree__presentationThree,
  .HomeThree__presentationFour,
  .HomeThree__presentationFive,
  .HomeThree__presentationTwo {
    z-index: 3;
  }

  .HomeThree__presentationFour__mobile,
  .HomeThree__presentationFive__mobile,
  .HomeThree__presentationThree__mobile {
    display: block;
  }
  .HomeThree__presentationFour__desktop,
  .HomeThree__presentationFive__desktop,
  .HomeThree__presentationThree__desktop {
    display: none;
  }
}
</style>
