import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  DirectionalLight,
  AmbientLight
} from "three";

import { Station } from "../models/station.ts";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Logic {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  meshs: any[];
  mouseXPos: number;
  mouseYPos: number;
  height: number;
  ref: HTMLElement;

  constructor(ref: HTMLElement, refToAppend: HTMLElement) {
    const { width, height } = ref.getBoundingClientRect();
    this.height = height;
    this.ref = ref;
    this.meshs = [];
    this.scene = new Scene();
    this.mouseXPos = 0;
    this.mouseYPos = 0;
    this.camera = new PerspectiveCamera(
      45,
      width / height
    );
    this.camera.position.set(23, -3, -3);
    this.camera.lookAt(-5, -4, 11.5)

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const resizeCanvas = window.devicePixelRatio > 1;
    this.renderer.setSize(width , height, resizeCanvas);

    const directionalLight = new DirectionalLight(0xaaccaa, 5);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);
    const directionalTwoLight = new DirectionalLight(0xff0000, 5);
    directionalTwoLight.position.set(5, 1, 1).normalize();
    this.scene.add(directionalTwoLight);
    const directionalThreeLight = new DirectionalLight(0xffffff, 10);
    directionalThreeLight.position.set(5, 1, 1).normalize();
    //this.scene.add(directionalThreeLight);

    //const controls = new OrbitControls( this.camera, this.renderer.domElement );
    //controls.update();

    refToAppend.appendChild(this.renderer.domElement);

    const station = new Station(width);

    const loadStation = async () => {
      await station.loadMesh();
      this.meshs.push(station);
      this.addChildren();
      this.setView();
      this.registerEventListeners();
      this.tick();
    };

    /*window.addEventListener('mousemove', () => {
      console.log('cam pos', this.camera.position, 'controls', controls.target)
    })*/

    loadStation();
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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  isSectionVisible(): boolean {
    if (!this.ref) return false;
    const top = this.ref.getBoundingClientRect().top

    return top <= 0;
  }

  registerEventListeners() {
    window.onresize = () => {
      this.setView();
    };
  }
}
