import {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh
} from "three";

export class Cubes {
  mesh: Object3D[];
  mousePosX: number;

  constructor() {

    this.mesh = [];
    this.mousePosX = 0;

    const geometry = new BoxGeometry(0.4, 0.4, 0.4);
    const material = new MeshPhongMaterial({
      color: 0xff8ff4,
      shininess: 70,
      specular: 0xffabf7,
    });

    for (let i = -40; i < 40; i += 0.7) {
      for (let j = -1; j < 1; j += 0.7) {
        const cube = new Mesh(geometry, material);
        cube.position.set(i, j, i / 2);
        this.mesh.push(cube);
      }
    }

    window.addEventListener("scroll", () => {
      this.moveOnScroll();
    });

    this.tick();
  }

  tick() {
    this.move();

    requestAnimationFrame(() => {
      this.tick();
    });
  }

  move() {
    this.mesh.forEach((e) => {
      e.rotateY(0.005);

    });
  }

  moveOnScroll() {
    this.mesh.forEach((e) => {
      e.rotateY(Math.random() * (0.05 - 0.01) + 0.01);
      e.rotateX(Math.random() * (0.05 - 0.01) + 0.01);
    });
  }
}