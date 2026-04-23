import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

const AboutCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    let renderer, scene, camera, rings = [], sphere, torus, disposables = [];

    const create = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const color = themeRef.current === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
      const RING_COUNT = mobile ? 2 : 3;

      for (let r = 0; r < RING_COUNT; r++) {
        const count = mobile ? 30 + r * 10 : 60 + r * 20;
        const radius = 8 + r * 5;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = Math.sin(angle) * radius;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ size: 0.12 - r * 0.02, color, transparent: true, opacity: 0.6 - r * 0.12, blending: THREE.AdditiveBlending, depthWrite: false });
        const points = new THREE.Points(geo, mat);
        points.userData = { speed: 0.002 - r * 0.0004 };
        points.rotation.x = r * 0.4;
        scene.add(points);
        rings.push(points);
        disposables.push(geo, mat);
      }

      const sGeo = new THREE.SphereGeometry(2, mobile ? 16 : 32, mobile ? 16 : 32);
      const sMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending });
      sphere = new THREE.Mesh(sGeo, sMat);
      scene.add(sphere);
      disposables.push(sGeo, sMat);

      const tGeo = new THREE.TorusGeometry(14, 0.05, 8, mobile ? 50 : 100);
      const tMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
      torus = new THREE.Mesh(tGeo, tMat);
      torus.rotation.x = Math.PI / 2;
      scene.add(torus);
      disposables.push(tGeo, tMat);

      let time = 0;
      const wh = window.innerHeight;
      const animate = () => {
        if (!activeRef.current) return;
        frameRef.current = requestAnimationFrame(animate);
        time += 0.005;

        const rect = mount.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));

        rings.forEach((ring, i) => {
          const speedMult = 1 + s * 4;
          ring.rotation.z += ring.userData.speed * speedMult;
          ring.rotation.y += ring.userData.speed * 0.5 * speedMult;
          ring.rotation.x = i * 0.4 + s * 1.2;
          ring.scale.setScalar(1 + s * 0.4);
          ring.material.opacity = (0.6 - i * 0.12) * (0.4 + s * 1.2);
        });

        sphere.scale.setScalar(1 + Math.sin(time * 3) * 0.12 + s * 1.5);
        sphere.material.opacity = 0.03 + s * 0.08;
        torus.rotation.z = time * 0.2 + s * 2;
        torus.scale.setScalar(1 + s * 0.3);
        camera.position.z = 30 - s * 8;

        renderer.render(scene, camera);
      };
      animate();
    };

    const destroy = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      cancelAnimationFrame(frameRef.current);
      disposables.forEach((d) => d.dispose());
      disposables = []; rings = [];
      if (renderer) { if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); renderer = null; }
    };

    const observer = new IntersectionObserver(([entry]) => { entry.isIntersecting ? create() : destroy(); }, { rootMargin: "100px" });
    observer.observe(mount);

    const handleResize = () => { if (!activeRef.current || !renderer || !camera) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("resize", handleResize);

    return () => { destroy(); observer.disconnect(); window.removeEventListener("resize", handleResize); };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default AboutCanvas;
