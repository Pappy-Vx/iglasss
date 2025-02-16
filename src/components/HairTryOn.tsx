import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FaceMesh, Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import './HairTryOn.css';

interface HairFilter {
  id: string;
  name: string;
  modelUrl: string;
  thumbnail: string;
  scale?: THREE.Vector3;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}

const hairFilters: HairFilter[] = [
  {
    id: 'short-bob',
    name: 'Short Bob',
    modelUrl: "../../public/models/short-bob.glb",
    thumbnail: '/thumbnails/short-bob.png',
    scale: new THREE.Vector3(10, 10, 10),
    position: new THREE.Vector3(0, -0.3, 0),
    rotation: new THREE.Euler(0, 0, 0)
  }
];

const HairTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('long-wavy');
  
  // Three.js references
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const currentModelRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    // Initialize Three.js
    initThreeJS();

    // Initialize FaceMesh
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onResults);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await faceMesh.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    return () => {
      faceMesh.close();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (selectedFilter && sceneRef.current) {
      loadHairModel();
    }
  }, [selectedFilter]);

  const initThreeJS = () => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(640, 480);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Start animation loop
    animate();
  };

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    requestAnimationFrame(animate);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  const loadHairModel = () => {
    if (!sceneRef.current) return;

    const filter = hairFilters.find(f => f.id === selectedFilter);
    if (!filter) return;

    // Remove existing model if any
    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
    }

    // Load new model
    const loader = new GLTFLoader();
    loader.load(
      filter.modelUrl,
      (gltf) => {
        const model = gltf.scene;
        
        // Apply filter transformations
        if (filter.scale) model.scale.copy(filter.scale);
        if (filter.position) model.position.copy(filter.position);
        if (filter.rotation) model.rotation.copy(filter.rotation);

        currentModelRef.current = model;
        sceneRef.current?.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  };

  const onResults = (results: Results) => {
    if (!results.multiFaceLandmarks || !currentModelRef.current) return;

    const landmarks = results.multiFaceLandmarks[0];
    if (landmarks) {
      // Get key face landmarks for positioning
      const nose = landmarks[4];
      const leftEar = landmarks[234];
      const rightEar = landmarks[454];

      // Calculate face center and orientation
      const centerX = (leftEar.x + rightEar.x) / 2;
      const centerY = nose.y;
      const centerZ = nose.z;

      // Update model position
      if (currentModelRef.current) {
        // Convert MediaPipe coordinates to Three.js coordinates
        currentModelRef.current.position.x = (centerX - 0.5) * 2;
        currentModelRef.current.position.y = -(centerY - 0.5) * 2;
        currentModelRef.current.position.z = -centerZ;

        // Calculate head rotation
        const angle = Math.atan2(rightEar.x - leftEar.x, rightEar.y - leftEar.y);
        currentModelRef.current.rotation.y = angle;
      }
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
        {hairFilters.map((filter) => (
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