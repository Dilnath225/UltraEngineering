import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

const ServicesCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    let renderer, scene, camera, shapes = [], disposables = [];

    const create = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 25;

      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const color = themeRef.current === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
      const count = mobile ? 8 : 16;
      const geometries = [
        new THREE.IcosahedronGeometry(1.2, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
      ];

      for (let i = 0; i < count; i++) {
        const geo = geometries[i % geometries.length];
        const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 + Math.random() * 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15);
        mesh.userData = {
          rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
          floatOffset: Math.random() * Math.PI * 2,
          baseY: mesh.position.y,
          baseScale: 0.8 + Math.random() * 0.4,
        };
        scene.add(mesh);
        shapes.push(mesh);
        disposables.push(geo, mat);
      }

      let time = 0;
      const wh = window.innerHeight;
      const animate = () => {
        if (!activeRef.current) return;
        frameRef.current = requestAnimationFrame(animate);
        time += 0.01;

        const rect = mount.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));

        shapes.forEach((sh, i) => {
          sh.rotation.x += sh.userData.rotSpeed.x * (1 + s * 3);
          sh.rotation.y += sh.userData.rotSpeed.y * (1 + s * 3);
          sh.position.y = sh.userData.baseY + Math.sin(time + sh.userData.floatOffset) * (1.5 + s * 3);
          sh.scale.setScalar(sh.userData.baseScale * (1 + s * 1.2));
          sh.material.opacity = (0.12 + (i % 3) * 0.03) * (0.5 + s * 1.5);
        });
        scene.rotation.y = s * 0.8;

        renderer.render(scene, camera);
      };
      animate();
    };

    const destroy = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      cancelAnimationFrame(frameRef.current);
      disposables.forEach((d) => d.dispose());
      disposables = []; shapes = [];
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

export default ServicesCanvas;
