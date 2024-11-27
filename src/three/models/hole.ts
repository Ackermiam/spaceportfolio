import { Object3D, AnimationMixer, Clock } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class BlackHole {
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

  tick(xPos: number) {
    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
    this.moveHole(xPos);
  }

  async loadMesh() {
    const gltf = await this.loader.loadAsync(
      "/spaceportfolio/models/dark/scene.gltf"
    );
    this.mesh = gltf.scene;
    this.animation = gltf.animations;
    this.mesh.scale.set(3, 3, 3);
    this.mesh.position.y = 1;

    if(this.width < 900) {
      this.mesh.scale.set(2, 2, 2);
      this.mesh.position.y = 1.5;
    }

    if (gltf.animations.length > 0) {
      this.mixer = new AnimationMixer(this.mesh);
      const action = this.mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  }

  moveHole(xPos: number) {
    const normalize = (xPos / this.width) * 2 - 1;
    this.mesh.rotation.z = normalize / 20;
  }
}
