import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  DirectionalLight
} from "three";

import { BlackHole } from "../models/hole.ts";

export class Logic {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  meshs: any[];
  mouseXPos: number;
  mouseYPos: number;
  scrollProgress: number;
  height: number;
  cameraSteps: { x: number; y: number; z: number }[];

  constructor(ref: HTMLElement) {
    this.cameraSteps = [
      { x: 15, y: 5, z: 0 },
      { x: 0, y: 1, z: 5 },
      { x: -15, y: 1, z: 10 },
      { x: -5, y: -20, z: 5 }
    ];
    this.scrollProgress = 0;
    const { width, height } = ref.getBoundingClientRect();
    this.height = height;
    this.meshs = [];
    this.scene = new Scene();
    this.mouseXPos = 0;
    this.mouseYPos = 0;
    this.camera = new PerspectiveCamera(
      45,
      width / height
    );
    this.camera.position.set(15, 5, 0);
    this.camera.lookAt(0, 3, 0);


    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const resizeCanvas = window.devicePixelRatio > 1;
    this.renderer.setSize(width , height, resizeCanvas);

    const directionalLight = new DirectionalLight(0xff0000, 3);
    directionalLight.position.set(0, 1, -5).normalize();
    this.scene.add(directionalLight);

    ref.appendChild(this.renderer.domElement);

    const eventLoading = new CustomEvent("loading", {
      detail: false,
    });

    const blackHole = new BlackHole(width);

    const loadBlackHole = async () => {
      await blackHole.loadMesh();
      this.meshs.push(blackHole);
      this.addChildren();
      this.setView();
      this.registerEventListeners();
      window.dispatchEvent(eventLoading);
      this.tick();
    };

    loadBlackHole();
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
      this.meshs[i].tick(this.mouseYPos);
    }
  }

  setView() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  registerEventListeners() {
    window.onresize = () => {
      this.setView();
    };
    window.addEventListener("mousemove", (e) => {
      this.mouseXPos = e.clientX;
      this.mouseYPos = e.clientY;
    });

    window.addEventListener("scroll", () => {
      const scrollableHeight = (this.height * 4) - window.innerHeight;
      this.scrollProgress = window.scrollY / scrollableHeight;

      const segmentCount = this.cameraSteps.length - 1;
      const segmentProgress = this.scrollProgress * segmentCount; // Progression totale multipliée par les segments
      const currentSegment = Math.floor(segmentProgress); // Segment actif
      const segmentFraction = segmentProgress - currentSegment; // Progression relative dans le segment actuel

      // Limiter le segment pour rester dans la plage [0, segmentCount - 1]
      if (currentSegment >= segmentCount) return;

      // Positions de début et de fin pour le segment actif
      const start = this.cameraSteps[currentSegment];
      const end = this.cameraSteps[currentSegment + 1];

      // Interpoler entre ces deux étapes
      this.camera.position.x = this.lerp(start.x, end.x, segmentFraction);
      this.camera.position.y = this.lerp(start.y, end.y, segmentFraction);
      this.camera.position.z = this.lerp(start.z, end.z, segmentFraction);

      this.camera.lookAt(0, 3, 0);
    })
  }

  lerp(start: number, end: number, alpha: number): number {
    return start + (end - start) * alpha;
  }
}
