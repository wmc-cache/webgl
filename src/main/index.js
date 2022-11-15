import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

scene.add(camera);

for (let i = 0; i < 500; i++) {
  const ver = new THREE.BufferGeometry();
  const array = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    array[j] = Math.random() * 10 - 10;
  }
  ver.setAttribute("position", new THREE.BufferAttribute(array, 3));
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 1,
  });
  const box = new THREE.Mesh(ver, material);
  console.log(box);
  scene.add(box);
}

const texture = new THREE.TextureLoader().load(
  "./image/1.png",
  (res) => {
    console.log("res", res);
  },
  () => {},
  (error) => {
    console.log("error", error);
  }
);
const ver = new THREE.BoxBufferGeometry(2, 1.5, 1.5);

const material = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: texture,
});

const box = new THREE.Mesh(ver, material);

//scene.add(box);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

const axexHelper = new THREE.AxesHelper(5);

//scene.add(axexHelper);

gsap.to(box.position, {
  x: 5,
  duration: 5,
  ease: "power1.inOut",
  onComplete: () => {
    console.log("complete");
  },
  onStart: () => {
    console.log("start");
  },
  repeat: -1,
  yoyo: true,
  delay: 1,
});
gsap.to(box.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  repeat: -1,
  yoyo: true,
  delay: 1,
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener("dblclick", (e) => {
  renderer.domElement.requestFullscreen();
});

const gui = new dat.GUI();

gui.add(box.position, "y", -10, 10).step(0.1);
gui.add(box.position, "z", -10, 10).step(0.1);
