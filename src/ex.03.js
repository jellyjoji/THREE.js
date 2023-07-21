import * as THREE from "three";
import dat from "dat.gui";

// ----- 주제: 기본 장면 구성

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
  camera.position.set(0, 2, 5);
  scene.add(camera);

  // 조명(광원)
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);
  const spotLight = new THREE.SpotLight("white", 0.7);
  spotLight.position.set(-1, 1, 3);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 메쉬
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const box = new THREE.Mesh(geometry, material);
  box.position.y = 0.5;
  box.castShadow = true;
  // scene.add(box);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "lightgray" })
  );
  floor.rotation.x = THREE.MathUtils.degToRad(-90);
  floor.receiveShadow = true;
  scene.add(box, floor);

  // 반복해서 그리기
  function draw() {
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
