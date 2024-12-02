import { Object3D, AnimationMixer, Clock } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Bluehole {
  mesh: Object3D;
  loader: GLTFLoader;
  clock = new Clock();
  animation: any;
  mixer: AnimationMixer | null = null;
  width: number;

  constructor(width: number) {
    this.loader = new GLTFLoader();
    this.mesh = new Object3D();
    this.width = width;
  }

  tick() {
    this.move()
  }

  async loadMesh() {
    const gltf = await this.loader.loadAsync(
      "/spaceportfolio/models/tokyo/scene.gltf"
    );
    this.mesh = gltf.scene;
    this.animation = gltf.animations;
    this.mesh.scale.set(1, 1, 1);
    this.mesh.rotateX(0.5)

    if(this.width < 900) {
      this.mesh.scale.set(1, 1, 1);
    }
  }

  move() {
    this.mesh.rotateY(0.008)
  }
}
