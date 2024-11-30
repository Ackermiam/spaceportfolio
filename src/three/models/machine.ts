import { Object3D, AnimationMixer, Clock } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Machine {
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

  }

  async loadMesh() {
    const gltf = await this.loader.loadAsync(
      "/spaceportfolio/models/machine/scene.gltf"
    );
    this.mesh = gltf.scene;
    this.animation = gltf.animations;
    this.mesh.scale.set(30, 30, 30);
    this.mesh.position.y = 1;

    if(this.width < 900) {
      this.mesh.scale.set(27, 27, 27);
    }
  }
}
