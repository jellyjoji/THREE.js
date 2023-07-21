import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import dat from "dat.gui";

// ----- 주제: 애니메이션

export default function example() {
  // 렌더러 만들기
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    // canvas: canvas,
    canvas,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true; // 그림자 표시하기

  // 씬 만들기
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 화면비(aspect)
    0.1,
    1000
  );
  // camera.position.x = 0;
  // camera.position.y = 2;
  // camera.position.z = 5;
  camera.position.set(0, 2, 3);
  scene.add(camera);

  // 조명(광원)
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);
  const spotLight = new THREE.SpotLight("white", 0.7);
  spotLight.position.set(-1, 1, 3);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // GLTF 로더
  // https://sketchfab.com/ 에서 여기서 GLB 로 받아서 사용
  const gltfLoader = new GLTFLoader();

  // 메쉬
  let table;
  gltfLoader.load(
    "./models/computer_with_a_table.glb",
    // 로드가 끝나면 실행되는 함수
    (glb) => {
      console.log(glb);
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      table = glb.scene.children[0];
      scene.add(table);
    }
  );

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "lightgray" })
  );
  floor.rotation.x = THREE.MathUtils.degToRad(-90);
  floor.receiveShadow = true;
  scene.add(floor);

  // 반복해서 그리기
  const clock = new THREE.Clock();

  function draw() {
    let delta = clock.getDelta();

    if (table) {
      // table.position.y += 0.01;
      // table.rotation.z += 0.01;
      table.rotation.z += delta;
    }

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
    // window.requestAnimationFrame(draw);
  }
  draw();

  // 이벤트
  // 브라우저 창 변경 시, 캔버스 사이즈를 맞추기 위해서
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);

  // GUI
  const gui = new dat.GUI();
  gui.add(camera.position, "x", -10, 10, 0.01).name("카메라 x");
  gui.add(spotLight.position, "x", -10, 10, 0.01).name("조명 x");
  gui.add(spotLight.position, "y", -10, 10, 0.01).name("조명 y");
  gui.add(spotLight.position, "z", -10, 10, 0.01).name("조명 z");
}
