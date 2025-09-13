import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const RAY_CASTER = new THREE.Raycaster();
const CUBE_ID = 'theCube';
const MINUTE_RECIPROCAL = 1 / 60; // 나누기연산 최적화

export type Q4Props = {
  colorPreset: number[];
  frequency: number; // 분당 회전수
  direction: 'clockwise' | 'counterclockwise';
  enableOrbitControls?: boolean;
};
function Q4({
  colorPreset,
  frequency,
  enableOrbitControls,
  direction,
}: Q4Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const frequencyRef = useRef(frequency);
  const prevElapsedRef = useRef(0); // animate에서 delta 계산용
  const directionRef = useRef<1 | -1>(direction === 'clockwise' ? -1 : 1); //y축 오른손 회전이 +

  useEffect(() => {
    frequencyRef.current = frequency;
  }, [frequency]);

  useEffect(() => {
    directionRef.current = direction === 'clockwise' ? -1 : 1;
  }, [direction]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const getCanvasSize = () => {
      const canvasWidth = containerRef.current!.clientWidth;
      const canvasHeight = containerRef.current!.clientHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      return { canvasWidth, canvasHeight, canvasRatio };
    };

    const { canvasWidth, canvasHeight, canvasRatio } = getCanvasSize();

    // Three.js 기본 세팅
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff);
    document
      .getElementById('canvasContainer')
      ?.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, canvasRatio, 0.1, 100);

    camera.position.set(0, 1, 3);
    // camera.position.set(0, 0.5, 3);

    const controls = enableOrbitControls
      ? new OrbitControls(camera, renderer.domElement)
      : null;
    controls?.target.set(0, 0, 0);

    // 씬 세팅
    const scene = new THREE.Scene();
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: colorPreset[0] }),
    );
    cube.userData.cubeID = CUBE_ID;
    scene.add(cube);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(3, 3, 3);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);

    // 렌더 업데이트 및 인터랙션 세팅
    let anim = 0;
    const animate = (elapsed: number) => {
      anim = requestAnimationFrame(animate);

      // rpm 계산용으로 delta_t 구하기
      const delta = elapsed - prevElapsedRef.current;
      prevElapsedRef.current = elapsed;
      const deltaSecond = delta * 0.001;

      // 변화된 각도만큼 y축 회전
      const angleDelta =
        deltaSecond * (frequencyRef.current * MINUTE_RECIPROCAL) * Math.PI * 2;
      cube.rotation.y += angleDelta * directionRef.current;

      controls?.update();
      renderer.render(scene, camera);
    };

    const handlePointerDown = () => {
      // orbit으로 인한 마우스 인터랙션 방지용
      isDraggingRef.current = false;
    };
    const handlePointerMove = () => {
      // orbit으로 인한 마우스 인터랙션 방지용
      isDraggingRef.current = true;
    };

    // 클릭이 감지되는 시점에 Raycast로 큐브 클릭 확인
    const handlePointerUp = (event: MouseEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        return;
      }

      const { canvasWidth, canvasHeight } = getCanvasSize();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / canvasWidth) * 2 - 1;
      mouse.y = -(event.clientY / canvasHeight) * 2 + 1;

      RAY_CASTER.setFromCamera(mouse, camera);
      const intersects = RAY_CASTER.intersectObject(cube);

      const cubeIntersect = intersects.find(
        intersect => intersect.object.userData.cubeID === CUBE_ID,
      );
      const cubeHit = cubeIntersect?.object?.userData?.cubeID === CUBE_ID;

      if (!cubeHit) {
        return;
      }

      colorIndexRef.current = (colorIndexRef.current + 1) % colorPreset.length;
      (cube.material as THREE.MeshStandardMaterial).color.setHex(
        colorPreset[colorIndexRef.current],
      );
      renderer.render(scene, camera);
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    // 리사이즈되면 프로젝션 매트릭스 업데이트
    const onResize = () => {
      const { canvasWidth, canvasHeight, canvasRatio } = getCanvasSize();

      camera.aspect = canvasRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasWidth, canvasHeight);
    };
    window.addEventListener('resize', onResize);

    // 렌더 시작
    anim = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(anim);

      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', onResize);

      scene.clear();
      renderer.dispose();

      document
        .getElementById('canvasContainer')
        ?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      id="canvasContainer"
    ></div>
  );
}

export default Q4;
