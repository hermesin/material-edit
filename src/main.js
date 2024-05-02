import * as THREE from "three";
import {
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
} from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import Stats from "three/addons/libs/stats.module.js";

let camera, renderer, scene, mesh;
let stats, container, controls;
let geometry = new THREE.TorusKnotGeometry(9, 4, 75, 10);
init();
animate();

const property = {
  color: 0x0000ff,
  wireframe: true,
  vertexColors: false,
  fog: true,
  flatShading: true,
  emissive: 0x0000ff,
  roughness: 0.3,
  metalness: 0.4,
  ior: 1.5,
  reflectivity: 0.5,
  refractionRatio: 0.8,
  iridescence: 0.3,
  iridescenceIOR: 1.4,
  sheen: 0,
  sheenColor: 0x0000ff,
  clearcoat: 0,
  clearcoatRoughness: 0,
  specularIntensity: 1,
  specularColor: 0x0000ff,
  control_property: false,
};

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(20, 20, 40);

  stats = new Stats();
  container.appendChild(stats.dom);

  scene = new THREE.Scene();
  scene.environment = new RGBELoader().load(
    "/hdr/bismarckturm_hillside_1k.hdr"
  );
  scene.background = new THREE.Color("#444444");
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // directionalLight.position.set(1, 1, 1);
  // scene.add(directionalLight);

  const material = new MeshBasicMaterial({ color: "white" });
  mesh = new THREE.Mesh(geometry, material);
  mesh.name = "torus";
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);

  control();
}

const textureLoader = new THREE.TextureLoader();
const porcelainWhite = textureLoader.load(
  "/texture/matcap-porcelain-white.jpg"
);

var dropbtn = document.getElementsByClassName("dropdown");
dropbtn[0].addEventListener("click", function () {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    } else {
      openDropdown.classList.add("show");
    }
  }
});

var acc = document.getElementsByClassName("drptbasic");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var basic = document.getElementsByClassName("basic");
basic[0].addEventListener("click", function () {
  scene.traverse(function (mesh) {
    const material = new MeshBasicMaterial({
      color: property.color,
      wireframe: property.wireframe,
      vertexColors: property.vertexColors,
      fog: property.fog,
      // envMaps: reflection,
      // map: bricks,
      // alphaMap: fibers,
      // combine: THREE.MultiplyOperation,
      reflectivity: property.reflectivity,
      refractionRatio: property.refractionRatio,
    });
    mesh.material = material;
  });
});

var lambert = document.getElementsByClassName("lambert");
lambert[0].addEventListener("click", function () {
  scene.traverse(function (mesh) {
    const material = new MeshLambertMaterial({
      color: property.color,
      wireframe: property.wireframe,
      vertexColors: property.vertexColors,
      fog: property.fog,
      // envMaps: reflection,
      // map: bricks,
      // alphaMap: fibers,
      // combine: THREE.MultiplyOperation,
      reflectivity: property.reflectivity,
      refractionRatio: property.refractionRatio,
    });
    mesh.material = material;
  });
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function control() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.dampingFactor = 0.1;
  controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
  controls.autoRotateSpeed = 0.2; // 30
}

function animate() {
  requestAnimationFrame(animate);
  stats.begin();

  renderer.render(scene, camera);

  stats.end();
}

//

// const reflection = textureLoader.load("/texture/px.jpg");
// const reflectivity = textureLoader.load("/texture/nz.jpg");
// const bricks = textureLoader.load("/texture/brick_roughness.jpg");
// const fibers = textureLoader.load("/texture/alphaMap.jpg");
// const porcelainWhite = textureLoader.load(
//   "/texture/matcap-porcelain-white.jpg"
// );
