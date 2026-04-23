import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

const ProjectsCanvas = ({ theme }) => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = isMobile();
    let renderer, scene, camera, dotGeo, dotMat, lineGeo, lineMat, disposables = [];

    const create = () => {
      if (activeRef.current) return;
      activeRef.current = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.set(0, 12, 22);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const color = themeRef.current === "dark" ? new THREE.Color(0x00a2ff) : new THREE.Color(0x2563eb);
      const GRID = mobile ? 20 : 40;
      const SPACING = mobile ? 2 : 1.2;
      const gridPositions = new Float32Array(GRID * GRID * 3);

      for (let ix = 0; ix < GRID; ix++) {
        for (let iz = 0; iz < GRID; iz++) {
          const idx = (ix * GRID + iz) * 3;
          gridPositions[idx] = (ix - GRID / 2) * SPACING;
          gridPositions[idx + 1] = 0;
          gridPositions[idx + 2] = (iz - GRID / 2) * SPACING;
        }
      }

      dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute("position", new THREE.BufferAttribute(gridPositions.slice(), 3));
      dotMat = new THREE.PointsMaterial({ size: mobile ? 0.15 : 0.08, color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
      scene.add(new THREE.Points(dotGeo, dotMat));
      disposables.push(dotGeo, dotMat);

      const indices = [];
      for (let ix = 0; ix < GRID; ix++) for (let iz = 0; iz < GRID - 1; iz++) indices.push(ix * GRID + iz, ix * GRID + iz + 1);
      for (let iz = 0; iz < GRID; iz++) for (let ix = 0; ix < GRID - 1; ix++) indices.push(ix * GRID + iz, (ix + 1) * GRID + iz);

      lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(gridPositions.slice(), 3));
      lineGeo.setIndex(indices);
      lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
      scene.add(new THREE.LineSegments(lineGeo, lineMat));
      disposables.push(lineGeo, lineMat);

      let time = 0;
      const wh = window.innerHeight;
      const animate = () => {
        if (!activeRef.current) return;
        frameRef.current = requestAnimationFrame(animate);
        time += 0.015;

        const rect = mount.getBoundingClientRect();
        const s = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));

        const amplitude = 0.5 + s * 3;
        const dp = dotGeo.attributes.position.array;
        const lp = lineGeo.attributes.position.array;
        for (let ix = 0; ix < GRID; ix++) {
          for (let iz = 0; iz < GRID; iz++) {
            const idx = (ix * GRID + iz) * 3;
            const y = Math.sin(ix * 0.3 + time) * amplitude + Math.cos(iz * 0.3 + time * 0.7) * amplitude;
            dp[idx + 1] = y;
            lp[idx + 1] = y;
          }
        }
        dotGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.position.needsUpdate = true;
        dotMat.opacity = 0.3 + s * 0.6;
        lineMat.opacity = 0.04 + s * 0.12;
        camera.position.y = 12 - s * 6;
        scene.rotation.y = s * 0.4;

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

export default ProjectsCanvas;
