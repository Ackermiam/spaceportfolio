import { Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class Station {
  mesh: Object3D;
  loader: GLTFLoader;
  animation: any;
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
    this.mesh.rotateX(0.8)

    if(this.width < 900) {
      this.mesh.position.x = 6;
      this.mesh.position.y = -3;
    }
  }

  move() {
    this.mesh.rotateY(0.008)
  }
}
