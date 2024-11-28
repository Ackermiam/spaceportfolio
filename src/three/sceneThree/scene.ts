import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  DirectionalLight,
  AmbientLight
} from "three";

import { Machine } from "../models/machine.ts";

export class Logic {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  meshs: any[];
  mouseXPos: number;
  mouseYPos: number;
  scrollProgress: number;
  height: number;
  ref: HTMLElement;
  cameraSteps: { x: number; y: number; z: number }[];

  constructor(ref: HTMLElement) {
    this.cameraSteps = [
      { x: 0, y: 0.5, z: 0.7 },
      { x: 0, y: 0.5, z: 0.7 },
      { x: 3, y: 2, z: -1 },
      { x: 0, y: 0.5, z: 0.7 },
      { x: 3, y: 2, z: -1 },
    ];
    this.scrollProgress = 0;
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
    this.camera.position.set(0, 0.5, 0.7);
    this.camera.lookAt(0, 1,0);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const resizeCanvas = window.devicePixelRatio > 1;
    this.renderer.setSize(width , height, resizeCanvas);

    const directionalLight = new DirectionalLight(0xffffff, 8);
    directionalLight.position.set(1, 1, 2).normalize();
    this.scene.add(directionalLight);
    const light = new AmbientLight( 0x404040, 30 );
    this.scene.add( light );

    ref.appendChild(this.renderer.domElement);

    const machine = new Machine(width);

    const loadMachine = async () => {
      await machine.loadMesh();
      this.meshs.push(machine);
      this.addChildren();
      this.setView();
      this.registerEventListeners();
      this.tick();
    };

    loadMachine();
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

    window.addEventListener("scroll", () => {
      if (!this.isSectionVisible()) return;

      const scrollableHeight = (this.height * 5) - window.innerHeight;
      this.scrollProgress = window.scrollY / scrollableHeight;

      const segmentCount = this.cameraSteps.length - 1;
      const segmentProgress = this.scrollProgress * segmentCount; // Progression totale multipliée par les segments
      let currentSegment = Math.floor(segmentProgress); // Segment actif
      const segmentFraction = segmentProgress - currentSegment; // Progression relative dans le segment actuel

      // Limiter le segment pour rester dans la plage [0, segmentCount - 1]
      if (currentSegment >= segmentCount) return
      console.log(segmentCount)
      // Positions de début et de fin pour le segment actif
      const start = this.cameraSteps[currentSegment];
      const end = this.cameraSteps[currentSegment + 1];

      // Interpoler entre ces deux étapes
      this.camera.position.x = this.lerp(start.x, end.x, segmentFraction);
      this.camera.position.y = this.lerp(start.y, end.y, segmentFraction);
      this.camera.position.z = this.lerp(start.z, end.z, segmentFraction);

      this.camera.lookAt(0, 1, 0);
    });
  }

  lerp(start: number, end: number, alpha: number): number {
    return start + (end - start) * alpha;
  }
}
