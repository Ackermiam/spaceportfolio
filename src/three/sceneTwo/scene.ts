import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  DirectionalLight
} from "three";

import { Cubes } from "../models/cubes.ts";

export class Logic {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  meshs: any[];

  constructor(ref: HTMLElement) {
    const { width, height } = ref.getBoundingClientRect();
    this.meshs = [];
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      width / window.innerHeight * 2
    );
    this.camera.position.set(0, 0, 15);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const resizeCanvas = window.devicePixelRatio > 1;
    this.renderer.setSize(width , window.innerHeight * 2, resizeCanvas);

    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 1, 1).normalize();
    this.scene.add(directionalLight);

    ref.appendChild(this.renderer.domElement);

    const cubes = new Cubes();
    this.meshs.push(cubes);

    this.addChildren();

    if(width < 900) {
      this.camera.position.set(0, 3, 18);
      this.meshs[0].mesh.rotateX(2)
    }
    this.setView();
    this.registerEventListeners();

    this.tick();
  }

  tick() {
    this.renderer.render(this.scene, this.camera);
    this.tickChildren();

    requestAnimationFrame(() => {
      this.tick();
    });
  }

  addChildren() {
    for (let i = 0; i < this.meshs.length; i++) {
      this.scene.add(this.meshs[i].mesh);
    }
  }

  tickChildren() {
    for (let i = 0; i < this.meshs.length; i++) {
      this.meshs[i].tick();
    }
  }

  setView() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
  }

  registerEventListeners() {
    window.onresize = () => {
      this.setView();
    };
  }

}
