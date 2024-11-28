import {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh
} from "three";

export class Cubes {
  mesh: Object3D;

  constructor() {
    this.mesh = new Object3D;

    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshPhongMaterial({
      color: 0xff8ff4,
      shininess: 70,
      specular: 0xffabf7,
    });

    for (let i = -20; i < 20; i += 0.8) {
      for (let j = -2; j < 2; j += 0.8) {
        const cube = new Mesh(geometry, material);
        cube.position.set(i, j, i + 1.2);
        this.mesh.add(cube);
      }
    }

    this.mesh.rotateX(4)

    window.addEventListener("scroll", () => {
      this.moveOnScroll();
    });

    this.tick();
  }

  tick() {
  }

  moveOnScroll() {
    this.mesh.children.forEach((e) => {
      e.rotateY(Math.random() * (0.05 - 0.01) + 0.009);
      e.rotateX(Math.random() * (0.05 - 0.01) + 0.009);
    });
  }
}