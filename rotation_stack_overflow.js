console.clear();
("use strict");
import * as THREE from "https://threejs.org/build/three.module.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(2.5, 6, 6);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.GridHelper());

let g = new THREE.CylinderBufferGeometry(2, 2, 0.5, 32);
g.rotateZ(Math.PI * 0.5);
let m = new THREE.MeshBasicMaterial({ wireframe: true, color: "red" });
let wheel = new THREE.Mesh(g, m);
wheel.rotation.order = "YXZ";
wheel.position.y = 2;
scene.add(wheel);

document.addEventListener("keydown", (event) => {
  console.log(event);
  let val = 0.05;
  let angleTurn = event.key == "d" ? -val : event.key == "a" ? val : 0;
  event.key == "w"
    ? (wheel.rotation.x += 0.05)
    : event.key == "s"
    ? (wheel.rotation.x -= 0.05)
    : 0;
  wheel.rotation.y = THREE.MathUtils.clamp(
    wheel.rotation.y + angleTurn,
    -Math.PI * 0.25,
    Math.PI * 0.25
  );
});

renderer.setAnimationLoop(() => {
  // wheel.rotation.x += 0.01;
  renderer.render(scene, camera);
});
