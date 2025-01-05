<template>
  <section class="Slider">
    <div
      class="Slider__container"
      ref="scrollableContent"
      v-if="!isMobile()"
    >
      <div class="Slider__slider" ref="animatedContent">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="Slider__slider__project"
          :style="{ background: `url(${slide.background})` }"
          @click="redirect(slide.url)"
        >
          <h3 class="Slider__slider__project__title">
            {{ slide.name }}
          </h3>
        </div>
      </div>
    </div>
    <div v-if="isMobile()" class="Slider__containerMobile">
      <div class="Slider__containerMobile__slider">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="Slider__containerMobile__slider__project"
          :style="{
            background: `url(${slide.background})`,
          }"
          @click="redirect(slide.url)"
        >
          <h3 class="Slider__containerMobile__slider__project__title">
            {{ slide.name }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const animatedContent = ref();
const scrollableContent = ref();

const slides: Record<string, string>[] = [
  {
    background: "/spaceportfolio/assets/prez.PNG",
    url: "https://ackermiam.github.io/lab-fps/",
    name: "doomo",
  },
  {
    background: "/spaceportfolio/assets/labyrinthe.PNG",
    url: "https://ackermiam.github.io/labyrinthe/",
    name: "labyrinthe",
  },
  {
    background: "/spaceportfolio/assets/onroad.PNG",
    url: "https://ackermiam.github.io/on-road/",
    name: "on-road",
  },
  {
    background: "/spaceportfolio/assets/mapeditr.PNG",
    url: "https://ackermiam.github.io/map-editor/",
    name: "map-editor",
  },
  {
    background: "/spaceportfolio/assets/horror.PNG",
    url: "https://ackermiam.github.io/horror-site/",
    name: "horror-test",
  },
  {
    background: "/spaceportfolio/assets/portfolio.PNG",
    url: "https://ackermiam.github.io/portfolio/",
    name: "portfolio-test",
  },
  {
    background: "/spaceportfolio/assets/rpgamebackground.PNG",
    url: "https://ackermiam.github.io/rp-game/",
    name: "rp-game",
  },
  {
    background: "/spaceportfolio/assets/egirlinvaderbackground.PNG",
    url: "https://ackermiam.github.io/egirl-invaders/",
    name: "egirl-invaders",
  }
];

const isMobile = () => {
  return window.innerWidth <= 900;
};

const handleScroll = () => {
  const progress =
    animatedContent.value.offsetTop /
    (scrollableContent.value.scrollHeight - animatedContent.value.offsetHeight);

  const maxScroll = animatedContent.value.scrollWidth - window.innerWidth;

  animatedContent.value.style.transform = `translateX(${
    -progress * maxScroll
  }px)`;
};

const redirect = (url: string) => {
  window.open(url, "_blank");
};

onMounted(() => {
  if (scrollableContent.value && animatedContent.value) {
    const firstSlide = animatedContent.value.querySelector(
      ".Slider__slider__project"
    );
    if (firstSlide) {
      scrollableContent.value.style.setProperty(
        "--sliderWidth",
        `${
          slides.length * firstSlide.clientWidth + slides.length * 50 + 750
        }px`
      );
    }

    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.Slider {
  position: relative;

  @media (min-width: 900px) {
    position: absolute;
    }

  &__container {
    display: none;

    @media (min-width: 900px) {
      display: flex;
      height: 250vh;
    }
  }

  &__slider {
    position: sticky;
    top: calc(50%);
    left: 0;
    width: var(--sliderWidth);
    height: 70vh;
    display: flex;
    margin-left: 550px;

    &__project {
      min-width: 450px;
      height: 250px;
      position: relative;
      margin: 0 25px;
      cursor: pointer;
      overflow: hidden;
      border: 6px solid rgba(185, 253, 255, 0.767);
      transition: all 0.4s ease;
      filter: drop-shadow(-5px 5px 0px rgba(252, 47, 47, 0.664));

      &::before {
        content: "";
        position: absolute;
        top: -5px;
        left: -10px;
        width: 110%;
        height: 105%;
        background: inherit;
        background-size: cover;
        background-position: center;
        filter: blur(5px);
        transition: all 0.4s ease;
      }

      &:hover {
        transform: rotateX(-20deg) rotateY(-20deg);
        &::before {
          filter: blur(0);
          left: -25px;
        }
      }

      &__title {
        position: absolute;
        width: 100%;
        text-align: center;
        font-family: "Mewatonia";
        font-size: 4em;
        color: rgba(185, 253, 255, 0.514);
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        filter: drop-shadow(-3px 3px 0px rgb(255, 0, 0))
      }
    }
  }

  &__containerMobile {
    display: flex;
    align-items: center;

    @media (min-width: 900px) {
      display: none;
    }

    &__slider {
      width: 100vw;
      padding-bottom: 5px;
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      &__project {
        min-width: 300px;
        height: 200px;
        position: relative;
        margin: 0 25px;
        cursor: pointer;
        overflow: hidden;
        border: 6px solid rgba(185, 253, 255, 0.767);
        transition: all 0.4s ease;
        filter: drop-shadow(-5px 5px 0px rgba(252, 47, 47, 0.664));
        scroll-snap-align: center;

        &::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -10px;
          width: 105%;
          height: 105%;
          background: inherit;
          background-size: cover;
          background-position: center;
          filter: blur(2px);
          transition: all 0.3s ease;
        }

        &__title {
          position: absolute;
          width: 100%;
          text-align: center;
          font-family: "Mewatonia";
          font-size: 3em;
          color: rgba(185, 253, 255, 0.842);
          filter: drop-shadow(-3px 3px 0px rgb(255, 0, 0));
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          margin: 0;
          line-height: 25px;
        }
      }
    }
  }
}
</style>