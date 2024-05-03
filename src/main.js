import * as THREE from "three";
import {
  DoubleSide,
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

window.setType = function (event) {
  const type_effect = document.querySelector("#material_buttons");

  type_effect.querySelectorAll("button").forEach((button) => {
    button.style.backgroundColor = null;
  });
  const clickedButton = event.target.closest("button");
  clickedButton.style.backgroundColor = "#3300cc";
};

document.addEventListener("DOMContentLoaded", function () {
  const basicMaterialButton = document.querySelector(".basic.type");
  const depthMaterialButton = document.querySelector(".depth.type");
  const distanceMaterialButton = document.querySelector(".distance.type");
  const lambertMaterialButton = document.querySelector(".lambert.type");
  const matcapMaterialButton = document.querySelector(".matcap.type");
  const normalMaterialButton = document.querySelector(".normal.type");
  const phongMaterialButton = document.querySelector(".phong.type");
  const physicalMaterialButton = document.querySelector(".physical.type");
  const standardMaterialButton = document.querySelector(".standard.type");
  const toonMaterialButton = document.querySelector(".toon.type");

  const properties = document.querySelectorAll(".properties > div");

  basicMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "wireframe" ||
        propertyTitle === "vertexColor" ||
        propertyTitle === "fog" ||
        propertyTitle === "map" ||
        propertyTitle === "alphaMap" ||
        propertyTitle === "reflectivity" ||
        propertyTitle === "refractionratio" ||
        propertyTitle === "combine"
      ) {
        property.style.display = "block";
        property.classList.add("active");
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  depthMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (propertyTitle === "wireframe" || propertyTitle === "alphamap") {
        property.style.display = "block";
        property.classList.add("active");
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  distanceMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "fog" ||
        propertyTitle === "map" ||
        propertyTitle === "alphaMap"
      ) {
        property.style.display = "block";
        property.classList.add("active");
        // const result = document.querySelector(".active").querySelector("input");
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  lambertMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "emissive" ||
        propertyTitle === "wireframe" ||
        propertyTitle === "vertexColor" ||
        propertyTitle === "map" ||
        propertyTitle === "alphaMap" ||
        propertyTitle === "combine" ||
        propertyTitle === "reflectivity" ||
        propertyTitle === "refractionratio"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  matcapMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "flatShading" ||
        propertyTitle === "matCap" ||
        propertyTitle === "alphaMap"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  normalMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (propertyTitle === "flatShading" || propertyTitle === "wireframe") {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  phongMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "emissive" ||
        propertyTitle === "specular" ||
        propertyTitle === "shininess" ||
        propertyTitle === "flatShading" ||
        propertyTitle === "wireframe" ||
        propertyTitle === "vertexColor" ||
        propertyTitle === "fog" ||
        propertyTitle === "map" ||
        propertyTitle === "alphamap" ||
        propertyTitle === "combine" ||
        propertyTitle === "reflectivity" ||
        propertyTitle === "refractionratio"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  physicalMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property.querySelector(".property_title").innerText;
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "emissive" ||
        propertyTitle === "roughness" ||
        propertyTitle === "metalness" ||
        propertyTitle === "ior" ||
        propertyTitle === "reflectivity" ||
        propertyTitle === "iridescence" ||
        propertyTitle === "iridescenceIOR" ||
        propertyTitle === "sheen" ||
        propertyTitle === "sheenroughness" ||
        propertyTitle === "sheenColor" ||
        propertyTitle === "clearcoat" ||
        propertyTitle === "clearcoatRoughness" ||
        propertyTitle === "specularIntensity" ||
        propertyTitle === "specularColor" ||
        propertyTitle === "flatShading" ||
        propertyTitle === "wireframe" ||
        propertyTitle === "vertexColor" ||
        propertyTitle === "fog" ||
        propertyTitle === "specular" ||
        propertyTitle === "shininess" ||
        propertyTitle === "map" ||
        propertyTitle === "alphamap" ||
        propertyTitle === "metalnessMap" ||
        propertyTitle === "iridescenceMap"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
    Apply();
  });

  standardMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "emissive" ||
        propertyTitle === "roughness" ||
        propertyTitle === "metalness" ||
        propertyTitle === "flatshading" ||
        propertyTitle === "wireframe" ||
        propertyTitle === "vertexcolor" ||
        propertyTitle === "fog" ||
        propertyTitle === "map" ||
        propertyTitle === "alphamap" ||
        propertyTitle === "roughnessMap" ||
        propertyTitle === "metalnessMap"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
  });

  toonMaterialButton.addEventListener("click", function () {
    properties.forEach(function (property) {
      const propertyTitle = property
        .querySelector(".property_title")
        .innerText.toLowerCase();
      property.classList.remove("active");
      if (
        propertyTitle === "color" ||
        propertyTitle === "map" ||
        propertyTitle === "alphamap"
      ) {
        property.classList.add("active");
        property.style.display = "block";
      } else {
        property.style.display = "none";
      }
    });
  });
  Apply();
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

function Apply() {
  const materialData = {};
  const actives = document.querySelectorAll(".active");
  const combine = document.getElementById("combine").value;

  actives.forEach(function (active) {
    const select = active.querySelector("input");
    let porcelainWhite = {};
    let value = "";
    let idName = "";
    let fileURL = "";
    if (select == null) {
      value = combine;
      idName = document.querySelector("select").getAttribute("id");
    } else if (select.getAttribute("type") == "checkbox") {
      value = select.checked;
      idName = active.querySelector("input").getAttribute("id");
    } else if (select.getAttribute("type") == "file") {
      fileURL = getURL(select);
      if (fileURL == "") {
        porcelainWhite = null;
      } else porcelainWhite = textureLoader.load();
      idName = active.querySelector("input").getAttribute("id");
    } else {
      value = select.value;
      idName = active.querySelector("input").getAttribute("id");
    }
    if (value == "") materialData[idName] = porcelainWhite;
    else materialData[idName] = value;
  });
  console.log(materialData);
  scene.traverse(function (mesh) {
    const material = new MeshBasicMaterial(materialData);
    mesh.material = material;
  });
}

var apply = document.getElementById("button");

apply.addEventListener("click", () => {
  Apply();
});
async function getURL(fileInput) {
  let fileURL = "";
  await fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      fileURL = event.target.result;
    };

    reader.readAsDataURL(file);
  });
  console.log(fileURL);
  return fileURL;
}

// const reflectivity = textureLoader.load("/texture/nz.jpg");
// const bricks = textureLoader.load("/texture/brick_roughness.jpg");
// const fibers = textureLoader.load("/texture/alphaMap.jpg");
// const porcelainWhite = textureLoader.load(
//   "/texture/matcap-porcelain-white.jpg"
// );
