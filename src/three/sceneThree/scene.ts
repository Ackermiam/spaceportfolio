import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  DirectionalLight,
  AmbientLight,
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
  segmentProgress: number;
  pixelRatio: number;
  private observer: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;

  constructor(ref: HTMLElement, refToAppend: HTMLElement) {
    this.cameraSteps = [
      { x: 0, y: 1.62, z: 0 },
      { x: 0, y: 1, z: 0.5 },
      { x: 0.5, y: 0.5, z: 0.2 },
      { x: 1, y: 1.2, z: 0.5 },
      { x: 1, y: 2, z: 0 },
      { x: 0, y: 0.5, z: 0.7 },
      { x: -0.2, y: 1.1, z: 0 },
    ];
    this.scrollProgress = 0;
    this.segmentProgress = 0;
    const { width, height } = ref.getBoundingClientRect();
    this.height = height;
    this.ref = ref;
    this.meshs = [];
    this.scene = new Scene();
    this.mouseXPos = 0;
    this.mouseYPos = 0;
    this.camera = new PerspectiveCamera(45, width / height);
    this.camera.position.set(0, 1.62, 0);
    this.camera.lookAt(0, 1, 0);

    this.pixelRatio =
      width < 900
        ? Math.min(window.devicePixelRatio, 1.5)
        : window.devicePixelRatio;

    this.renderer = new WebGLRenderer({
      antialias: width > 900,
      powerPreference: "low-power",
    });

    this.renderer.setClearColor(0, 0);
    this.renderer.setPixelRatio(this.pixelRatio);
    const resizeCanvas = window.devicePixelRatio > 1;
    this.renderer.setSize(width, height, resizeCanvas);

    const directionalLight = new DirectionalLight(0xffffff, 8);
    directionalLight.position.set(1, 1, 2).normalize();
    this.scene.add(directionalLight);
    const light = new AmbientLight(0x404040, 30);
    this.scene.add(light);

    refToAppend.appendChild(this.renderer.domElement);

    const machine = new Machine(width);

    const loadMachine = async () => {
      await machine.loadMesh();
      this.meshs.push(machine);
      this.addChildren();
      this.setView();
      this.registerEventListeners();
      this.setupIntersectionObserver();
      this.tick();
    };

    loadMachine();
  }

  tick() {
    this.renderer.render(this.scene, this.camera);
    this.tickChildren();
    this.moveMachine();

    this.animationFrameId = requestAnimationFrame(() => {
      this.tick();
    });
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAnimation();
          } else {
            this.stopAnimation();
          }
        });
      },
      { threshold: 0.02 }
    );

    this.observer.observe(this.ref);
  }

  startAnimation() {
    if (this.animationFrameId === null) {
      this.tick();
    }
  }

  stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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
    const top = this.ref.getBoundingClientRect().top;

    return top <= 0;
  }

  registerEventListeners() {
    window.onresize = () => {
      this.setView();
    };

    window.addEventListener("scroll", () => {
      if (!this.isSectionVisible()) return;

      const distanceFromTop = window.scrollY - this.ref.offsetTop;
      const sectionHeight = this.ref.offsetHeight;
      const progress = distanceFromTop / sectionHeight;

      this.segmentProgress = progress * (this.cameraSteps.length - 1);
    });
  }

  moveMachine() {
    const currentSegment = Math.floor(this.segmentProgress); // Segment actif
    const segmentFraction = this.segmentProgress - currentSegment; // Progression relative dans le segment actuel

    // Limiter le segment pour rester dans la plage [0, this.cameraSteps.length - 1 - 1]
    if (currentSegment >= this.cameraSteps.length - 1) return;
    // Positions de début et de fin pour le segment actif

    const start = this.cameraSteps[Math.abs(currentSegment)];
    const end = this.cameraSteps[Math.abs(currentSegment) + 1];

    // Interpoler entre ces deux étapes
    this.camera.position.x = this.lerp(start.x, end.x, segmentFraction);
    this.camera.position.y = this.lerp(start.y, end.y, segmentFraction);
    this.camera.position.z = this.lerp(start.z, end.z, segmentFraction);

    this.camera.lookAt(0, 1, 0);
  }

  lerp(start: number, end: number, alpha: number): number {
    return start + (end - start) * alpha;
  }
}
