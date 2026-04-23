import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

const ContactCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    let renderer, scene, camera, arcs = [], sparkGeo, sparkMat, sparkVelocities = [], disposables = [];

    const create = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 25;

      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const color = themeRef.current === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
      const ARC_COUNT = mobile ? 4 : 8;
      const SPARK_COUNT = mobile ? 30 : 80;

      for (let a = 0; a < ARC_COUNT; a++) {
        const SEGMENTS = 30;
        const positions = new Float32Array(SEGMENTS * 3);
        const startX = (Math.random() - 0.5) * 40;
        const startY = (Math.random() - 0.5) * 25;
        const endX = startX + (Math.random() - 0.5) * 20;
        const endY = startY + (Math.random() - 0.5) * 15;
        for (let i = 0; i < SEGMENTS; i++) {
          const t = i / (SEGMENTS - 1);
          positions[i * 3] = startX + (endX - startX) * t;
          positions[i * 3 + 1] = startY + (endY - startY) * t;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false });
        const line = new THREE.Line(geo, mat);
        line.userData = { startX, startY, endX, endY, segments: SEGMENTS, flickerSpeed: 0.05 + Math.random() * 0.1, phase: Math.random() * Math.PI * 2 };
        scene.add(line);
        arcs.push(line);
        disposables.push(geo, mat);
      }

      const sparkPositions = new Float32Array(SPARK_COUNT * 3);
      sparkVelocities = [];
      for (let i = 0; i < SPARK_COUNT; i++) {
        sparkPositions[i * 3] = (Math.random() - 0.5) * 50;
        sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        sparkVelocities.push({ x: (Math.random() - 0.5) * 0.03, y: (Math.random() - 0.5) * 0.03 });
      }

      sparkGeo = new THREE.BufferGeometry();
      sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
      sparkMat = new THREE.PointsMaterial({ size: 0.12, color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
      scene.add(new THREE.Points(sparkGeo, sparkMat));
      disposables.push(sparkGeo, sparkMat);

      let time = 0;
      const wh = window.innerHeight;
      const animate = () => {
        if (!activeRef.current) return;
        frameRef.current = requestAnimationFrame(animate);
        time += 0.02;

        const rect = mount.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));

        const jitterMult = 1 + s * 4;
        arcs.forEach((arc) => {
          const pos = arc.geometry.attributes.position.array;
          const d = arc.userData;
          for (let i = 0; i < d.segments; i++) {
            const t = i / (d.segments - 1);
            pos[i * 3] = d.startX + (d.endX - d.startX) * t + (Math.random() - 0.5) * (jitterMult * Math.sin(t * Math.PI));
            pos[i * 3 + 1] = d.startY + (d.endY - d.startY) * t + (Math.random() - 0.5) * (jitterMult * Math.sin(t * Math.PI));
          }
          arc.geometry.attributes.position.needsUpdate = true;
          arc.material.opacity = (0.05 + Math.abs(Math.sin(time * d.flickerSpeed + d.phase)) * 0.2) * (0.5 + s * 1.5);
        });

        const speedMult = 1 + s * 3;
        const sp = sparkGeo.attributes.position.array;
        for (let i = 0; i < SPARK_COUNT; i++) {
          sp[i * 3] += sparkVelocities[i].x * speedMult;
          sp[i * 3 + 1] += sparkVelocities[i].y * speedMult;
          if (Math.abs(sp[i * 3]) > 25) sparkVelocities[i].x *= -1;
          if (Math.abs(sp[i * 3 + 1]) > 15) sparkVelocities[i].y *= -1;
        }
        sparkGeo.attributes.position.needsUpdate = true;
        sparkMat.opacity = 0.3 + s * 0.7;
        sparkMat.size = 0.08 + s * 0.12;
        scene.rotation.z = s * 0.15;

        renderer.render(scene, camera);
      };
      animate();
    };

    const destroy = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      cancelAnimationFrame(frameRef.current);
      disposables.forEach((d) => d.dispose());
      disposables = []; arcs = [];
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

export default ContactCanvas;
