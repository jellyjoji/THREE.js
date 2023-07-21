import * as THREE from "three";
// npm install dat.gui
import dat from "dat.gui";

// 주제 : 기본 장면 구성
// main.js 링크 변경해주기

export default function example() {
  // 렌더러 만들기
  // 인자 세팅 : three.js 로 어디에 그릴건지 설정. canvas 그림판에 그릴예정
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGKRendere({
    // canvas:canvas
    canvas,
    // 성능에 영향을 끼치기 때문에 성능이 중요하면 antialias 끄기
    // antialias : 계단현상 깨짐 현상 방지 (부드럽게 효과)
    antialias: true,
  });

  // 브라우저 사이즈로 설정해서 꽉차게 하겠다
  renderer.setSize(window, innerWidth, window.innerHight);
  // console.log(window.devicePixelRatio);
  // 고해상도로 보이기
  // 삼항연산자 개개인의 디바이스 해상도를 고려해서 조건을 걸어서 해상도가 안좋을때만 캔버스 사이즈 2배율로 비율이 늘어나도록 설정
  renderer.setPixelRatio(devicePixelRatio > 1 ? 2 : 1);
  // 그림자 표현 켜주기
  renderer.shadowMap.enabled = true;

  // 씬만들기
  const scen = new THREE.Scene();
  // 배경에 색상을 흰색으로 만들겠다
  scene.background = new THREE.Color("white");

  // 원근 카메라
  const camera = new THREE.PerspectiveCamera(
    // field of view 시야각 : 어느 시야까지 보일건지
    75, // 시야각
    window.innerWidth / window.innerHight, // aspect 화면비 가로세로 비율: 너비/높이
    0.1,
    1000
  );

  // 카메라의 위치
  // camera.position.x = 1; 좌우 : 왼쪽 - / 오른쪽 +
  // camera.position.y = 2; 위아래 : 위 + / 아래 -
  // camera.position.z = 5; 앞뒤 : 가까워지면 앞 + / 멀어지면 뒤 -
  // 위를 줄여서 position.set 으로 사용가능
  camera.position.set(0, 2, 5);
  scene.add(camera);

  // 조명 (광원)
  // .AmbientLight('white',0.5) 전체적인 톤 조정할때  ('',0) 으로 조정
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);
  // spotLight
  const spotLight = new THREE.SpotLight("white", 0.7);
  // spotLight.position.set(x, y, z);
  spotLight.position.set(-1, 1, 3);

  // mesh 매쉬 = geometry 모양 + meterial 재질
  const geometry = new THREE.BoxGeometry(1, 1, 1); //정육면체 (너비,높이,깊이)
  // 재질
  const meterial = new THREE.MeshBasicMaterial({ color: "red" });
  const box = new THREE.Mesh(geometry, meterial);
  box.position.y = 0.5;
  scene.add(box);

  // 바닥만들기
  // const floor = new THREE.PlaneGeometry(10,10);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "lightgray" })
  );
  // floor.rotation.x = -2 * Math.PI; 안되는중
  // 철봉처럼 돌리기  degree to radian(원하는 각도를 넣어줌) : 디그리를 라디안으로 바꿔줌
  floor.rotation.x = THREE.MathUtils.degToRad(-90);
  scene.add(box, floor);

  // 반복해서 그리기
  function draw() {
    renderer.render(scene, camera);
    // vr 기능을 쓸때는 setAnimationLoop
    // 초당 몇 프레임을 그려내는가
    // window.requestAnimationFrame(draw) : 부드러운 애니메이션을 위해 사용하고 그러한 기능을 제공한다. 좀더 쉽게 말해 브라우저가 렌더링을 할 수 있을때에 다음 렌더링을 진행할 수 있도록 최적화 해주는 툴과 같다.
    renderer.setAnimationLoop(draw);
    console.log(1);
  }
  draw();

  // 이벤트
  // 브라우저 창 변경시, 캔버스 사이즈를 맞추기 위해서

  renderer.render(scene, camera);

  // GUI
  const gui = new dat.GUI();

  const aa = {
    x: 0,
    y: 2,
  };
  gui
    .add(
      camera.position,
      // 어떤걸 바꿀건지
      "x",
      -10,
      10,
      // 단위 , 부드럽게 조정
      0.01
    )
    .name("카메라 x");

  // 조정할수잇는 UI
  gui.add(camera.position, "x", -10, 10, 0.01).name("조명 x");

  gui.add(camera.position, "x", -10, 10, 0.01).name("조명 y");

  gui.add(camera.position, "x", -10, 10, 0.01).name("조명 z");
}
