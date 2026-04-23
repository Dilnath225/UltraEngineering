import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

const HeroCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);
  const sceneObjsRef = useRef({ particles: null, lines: null, meshes: [] });

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const objs = sceneObjsRef.current;
    if (!objs.particles || !objs.lines) return;
    const color = theme === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
    objs.particles.material.color = color;
    objs.lines.material.color = color;
    objs.meshes.forEach((m) => { if (m.material) m.material.color = color.clone(); });
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    let renderer, scene, camera, particles, lines, glow, ring;
    let velocities = [], disposables = [];
    const mousePos = { x: 0, y: 0 };

    const create = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const color = themeRef.current === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
      const PARTICLE_COUNT = mobile ? 50 : 180;
      const spread = mobile ? 40 : 50;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      velocities = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        velocities.push({ x: (Math.random() - 0.5) * 0.015, y: (Math.random() - 0.5) * 0.015, z: (Math.random() - 0.5) * 0.008 });
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({ size: mobile ? 0.2 : 0.15, color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
      disposables.push(pGeo, pMat);

      const MAX_LINES = mobile ? 150 : 600;
      const lGeo = new THREE.BufferGeometry();
      const lPositions = new Float32Array(MAX_LINES * 6);
      lGeo.setAttribute("position", new THREE.BufferAttribute(lPositions, 3));
      lGeo.setDrawRange(0, 0);
      const lMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false });
      lines = new THREE.LineSegments(lGeo, lMat);
      scene.add(lines);
      disposables.push(lGeo, lMat);

      const gGeo = new THREE.SphereGeometry(2.5, mobile ? 16 : 32, mobile ? 16 : 32);
      const gMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending });
      glow = new THREE.Mesh(gGeo, gMat);
      glow.position.set(5, 0, 0);
      scene.add(glow);
      disposables.push(gGeo, gMat);

      const rGeo = new THREE.RingGeometry(8, 8.15, mobile ? 32 : 64);
      const rMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
      ring = new THREE.Mesh(rGeo, rMat);
      ring.position.set(5, 0, -5);
      scene.add(ring);
      disposables.push(rGeo, rMat);

      sceneObjsRef.current = { particles, lines, meshes: [glow, ring] };

      const CONNECTION_DISTANCE = mobile ? 10 : 8;
      let time = 0;

      const animate = () => {
        if (!activeRef.current) return;
        frameRef.current = requestAnimationFrame(animate);
        time += 0.003;

        // Read scroll inside RAF — no separate listener needed
        const rect = mount.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, -rect.top / rect.height));

        particles.rotation.y = s * 1.5;
        particles.rotation.x = s * 0.3;
        particles.material.opacity = 0.9 - s * 0.5;
        lines.material.opacity = 0.25 - s * 0.15;
        camera.position.z = 30 + s * 15;

        const posArray = pGeo.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          posArray[i * 3] += velocities[i].x * (1 + s * 2);
          posArray[i * 3 + 1] += velocities[i].y * (1 + s * 2);
          posArray[i * 3 + 2] += velocities[i].z;
          if (Math.abs(posArray[i * 3]) > spread / 2) velocities[i].x *= -1;
          if (Math.abs(posArray[i * 3 + 1]) > spread / 2) velocities[i].y *= -1;
          if (Math.abs(posArray[i * 3 + 2]) > 10) velocities[i].z *= -1;
        }
        pGeo.attributes.position.needsUpdate = true;

        let lineIdx = 0;
        const lp = lGeo.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            if (lineIdx >= MAX_LINES) break;
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECTION_DISTANCE) {
              lp[lineIdx * 6] = posArray[i * 3]; lp[lineIdx * 6 + 1] = posArray[i * 3 + 1]; lp[lineIdx * 6 + 2] = posArray[i * 3 + 2];
              lp[lineIdx * 6 + 3] = posArray[j * 3]; lp[lineIdx * 6 + 4] = posArray[j * 3 + 1]; lp[lineIdx * 6 + 5] = posArray[j * 3 + 2];
              lineIdx++;
            }
          }
          if (lineIdx >= MAX_LINES) break;
        }
        lGeo.setDrawRange(0, lineIdx * 2);
        lGeo.attributes.position.needsUpdate = true;

        ring.rotation.x = Math.sin(time) * 0.5 + s * 2;
        ring.rotation.y = time * 0.3 + s;
        ring.scale.setScalar(1 + s * 0.5);
        glow.scale.setScalar(1 + Math.sin(time * 2) * 0.15 + s * 0.8);

        if (!mobile) {
          camera.position.x += (mousePos.x * 3 - camera.position.x) * 0.02;
          camera.position.y += (mousePos.y * 2 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);
      };
      animate();
    };

    const destroy = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      cancelAnimationFrame(frameRef.current);
      disposables.forEach((d) => d.dispose());
      disposables = [];
      sceneObjsRef.current = { particles: null, lines: null, meshes: [] };
      if (renderer) {
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose(); renderer = null;
      }
    };

    const observer = new IntersectionObserver(([entry]) => { entry.isIntersecting ? create() : destroy(); }, { rootMargin: "100px" });
    observer.observe(mount);

    const handleMouseMove = (e) => { mousePos.x = (e.clientX / window.innerWidth) * 2 - 1; mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1; };
    if (!mobile) window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => { if (!activeRef.current || !renderer || !camera) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("resize", handleResize);

    return () => { destroy(); observer.disconnect(); if (!mobile) window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("resize", handleResize); };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" style={{ willChange: "transform" }} />;
};

export default HeroCanvas;
