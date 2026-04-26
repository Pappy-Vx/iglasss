import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FaceMesh, Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import Header from './Header';
import Footer from './Footer';
import { FiCamera, FiRefreshCw } from 'react-icons/fi';

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
    name: 'Classic Frames',
    modelUrl: '/models/glasses1.glb',
    thumbnail: '/thumbnails/glasses-basic.png',
    scale: new THREE.Vector3(1, 1, 1),
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  },
];

const tips = [
  'Face the camera directly for best results.',
  'Make sure your face is well lit.',
  'Keep your head still for accurate tracking.',
  'Try different frames to find your perfect look.',
];

const GlassTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('basic-glasses');
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const currentModelRef = useRef<THREE.Group>();
  const cameraInstanceRef = useRef<Camera | null>(null);
  const requestIdRef = useRef<number>();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    initThreeJS();

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
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
      cameraInstanceRef.current = camera;
      camera
        .start()
        .then(() => {
          setHasPermission(true);
          setIsLoading(false);
        })
        .catch(() => {
          setHasPermission(false);
          setIsLoading(false);
        });
    }

    return () => {
      faceMesh.close();
      cameraInstanceRef.current?.stop();
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
      if (currentModelRef.current) {
        sceneRef.current?.remove(currentModelRef.current);
        currentModelRef.current = undefined as unknown as THREE.Group;
      }
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

    const camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
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
    requestIdRef.current = requestAnimationFrame(animate);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  const loadGlassesModel = () => {
    if (!sceneRef.current) return;
    const filter = glassesFilters.find((f) => f.id === selectedFilter);
    if (!filter) return;
    if (currentModelRef.current) sceneRef.current.remove(currentModelRef.current);

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
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  };

  const onResults = (results: Results) => {
    if (!results.multiFaceLandmarks || !currentModelRef.current) return;
    const landmarks = results.multiFaceLandmarks[0];
    if (landmarks) {
      const leftEye = landmarks[33];
      const rightEye = landmarks[263];
      const center = {
        x: (leftEye.x + rightEye.x) / 2,
        y: (leftEye.y + rightEye.y) / 2,
        z: (leftEye.z + rightEye.z) / 2,
      };
      currentModelRef.current.position.set(
        (center.x - 0.5) * 2,
        -(center.y - 0.5) * 2 + 0.2,
        -center.z
      );
      const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
      currentModelRef.current.rotation.y = -angle;
    }
  };

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-[#0A1D37]">
        {/* Page header */}
        <div className="text-white py-10 px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-3 block">
            Augmented Reality
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Virtual Try-On</h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            See how our frames look on your face in real time. No download needed.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera view */}
            <div className="lg:col-span-2">
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3]">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1D37]/80 text-white z-20">
                    <FiCamera className="w-10 h-10 mb-3 animate-pulse" />
                    <p className="text-sm">Requesting camera access…</p>
                  </div>
                )}
                {hasPermission === false && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A1D37] text-white z-20 p-6 text-center">
                    <FiCamera className="w-12 h-12 mb-4 text-red-400" />
                    <h3 className="font-bold text-lg mb-2">Camera Access Denied</h3>
                    <p className="text-sm text-white/60 mb-4">
                      Please allow camera access in your browser settings and reload the page.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex items-center gap-2 bg-white text-[#0A1D37] font-semibold px-5 py-2.5 rounded-full text-sm"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                      Retry
                    </button>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  autoPlay
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Frame selector */}
              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-white text-sm font-bold mb-3">Choose a Frame</h3>
                <div className="space-y-2">
                  {glassesFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        selectedFilter === filter.id
                          ? 'bg-white text-[#0A1D37]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="text-2xl">👓</span>
                      <span className="text-sm font-semibold">{filter.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-3">
                  More frames coming soon as 3D models are added to /public/models/
                </p>
              </div>

              {/* Tips */}
              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-white text-sm font-bold mb-3">Tips for best results</h3>
                <ul className="space-y-2">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3D model note */}
          <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-amber-300 text-sm font-semibold mb-1">Setup required for AR overlay</p>
            <p className="text-amber-300/70 text-xs leading-relaxed">
              Place your .glb 3D glasses models in <code className="bg-white/10 px-1 rounded">public/models/</code> and thumbnail images in{' '}
              <code className="bg-white/10 px-1 rounded">public/thumbnails/</code>. The face detection and camera are fully working — only the 3D model files need to be added.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GlassTryOn;
