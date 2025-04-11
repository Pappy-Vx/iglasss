import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FaceMesh, Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import './HairTryOn.css'; // rename CSS file accordingly

interface GlassesFilter {
  id: string;
  name: string;
  modelUrl: string;
  thumbnail: string;
  scale?: THREE.Vector3;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}

const glassesFilters: GlassesFilter[] = [
  {
    id: 'basic-glasses',
    name: 'Basic Glasses',
    modelUrl: '/models/glasses1.glb',
    thumbnail: '/thumbnails/glasses-basic.png',
    scale: new THREE.Vector3(1, 1, 1),  // adjusted scale
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  }
  
];

const HairTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('basic-glasses');

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const currentModelRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    initThreeJS();

    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      faceMesh.close();
      rendererRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (selectedFilter && sceneRef.current) loadGlassesModel();
  }, [selectedFilter]);

  const initThreeJS = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(640, 480);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    animate();
  };

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    requestAnimationFrame(animate);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  const loadGlassesModel = () => {
    if (!sceneRef.current) return;

    const filter = glassesFilters.find(f => f.id === selectedFilter);
    if (!filter) return;

    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
    }

    const loader = new GLTFLoader();
    loader.load(
      filter.modelUrl,
      (gltf) => {
        const model = gltf.scene;

        model.scale.copy(filter.scale || new THREE.Vector3(1, 1, 1));
        model.position.copy(filter.position || new THREE.Vector3());
        model.rotation.copy(filter.rotation || new THREE.Euler());

        currentModelRef.current = model;
        sceneRef.current?.add(model);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => console.error('Error loading model:', error)
    );
  };

  const onResults = (results: Results) => {
    if (!results.multiFaceLandmarks || !currentModelRef.current) return;

    const landmarks = results.multiFaceLandmarks[0];
    if (landmarks) {
      const leftEye = landmarks[33];  // outer corner of left eye
      const rightEye = landmarks[263]; // outer corner of right eye
      const center = {
        x: (leftEye.x + rightEye.x) / 2,
        y: (leftEye.y + rightEye.y) / 2,
        z: (leftEye.z + rightEye.z) / 2,
      };

      currentModelRef.current.position.set(
        (center.x - 0.5) * 2,
        -(center.y - 0.5) * 2 + 0.2,  // this 0.2 lifts the model up slightly
        -center.z
      );

      const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
      currentModelRef.current.rotation.y = -angle;
    }
  };

  return (
    <div className="hair-try-on">
    <div className="camera-view">
      <video
        ref={videoRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        playsInline
        autoPlay
      />
      <canvas
        ref={canvasRef}
        className="output-canvas"
        style={{ width: '100%', height: '100%' }}
      />
    </div>

      <div className="filter-selector">
        {glassesFilters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            <img src={filter.thumbnail} alt={filter.name} />
            <span>{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HairTryOn;