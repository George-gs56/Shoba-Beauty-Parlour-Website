"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    camera.position.z = 30;

    // ── Color Palette ─────────────────────────────────────────────────────────
    const goldColors = [
      new THREE.Color(0xc8a27d),
      new THREE.Color(0xd4a96a),
      new THREE.Color(0xe8c9a0),
      new THREE.Color(0xb89060),
      new THREE.Color(0xf0dfc0),
      new THREE.Color(0xffd89b),
      new THREE.Color(0xffe0b0),
    ];

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. ROSE PETALS — falling, tumbling
    // ═══════════════════════════════════════════════════════════════════════════
    const petals: THREE.Mesh[] = [];
    for (let i = 0; i < 45; i++) {
      const shape = new THREE.Shape();
      const w = Math.random() * 0.7 + 0.3;
      const h = Math.random() * 1.4 + 0.7;
      shape.ellipse(0, 0, w, h, 0, Math.PI * 2, false, 0);
      const geo = new THREE.ShapeGeometry(shape, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        transparent: true,
        opacity: Math.random() * 0.2 + 0.04,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 25
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData = {
        vy: -(Math.random() * 0.014 + 0.003),
        vx: (Math.random() - 0.5) * 0.007,
        rotSpeedX: (Math.random() - 0.5) * 0.009,
        rotSpeedZ: (Math.random() - 0.5) * 0.007,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
      };
      scene.add(mesh);
      petals.push(mesh);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. GOLD DUST — rising mist
    // ═══════════════════════════════════════════════════════════════════════════
    const DUST_COUNT = 320;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustVelocities: { vx: number; vy: number }[] = [];
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      dustVelocities.push({
        vx: (Math.random() - 0.5) * 0.007,
        vy: Math.random() * 0.007 + 0.002,
      });
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xd4a96a, size: 0.15, transparent: true, opacity: 0.5,
      sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. SPARKLE STARS — twinkling points
    // ═══════════════════════════════════════════════════════════════════════════
    const STAR_COUNT = 180;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 90;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xfff5e0, size: 0.22, transparent: true, opacity: 0.9,
      sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. SHOOTING STARS — fast light streaks
    // ═══════════════════════════════════════════════════════════════════════════
    interface ShootingStar {
      line: THREE.Line;
      active: boolean;
      countdown: number;
      vx: number; vy: number;
      life: number; maxLife: number;
    }

    const resetShootingStar = (s: ShootingStar) => {
      s.active = true;
      s.life = 0;
      s.maxLife = Math.random() * 40 + 25;
      const angle = Math.random() * Math.PI * 0.4 + Math.PI * 1.1;
      const speed = Math.random() * 0.7 + 0.4;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      const startX = (Math.random() - 0.5) * 70;
      const startY = Math.random() * 20 + 10;
      const posArr = s.line.geometry.attributes.position as THREE.BufferAttribute;
      posArr.setXYZ(0, startX, startY, (Math.random() - 0.5) * 10);
      posArr.setXYZ(1, startX, startY, (Math.random() - 0.5) * 10);
      posArr.needsUpdate = true;
      s.countdown = Math.random() * 300 + 150;
    };

    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 6; i++) {
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: 0xfff0d0, transparent: true, opacity: 0,
        depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      const s: ShootingStar = {
        line, active: false,
        countdown: Math.random() * 200 + i * 60,
        vx: 0, vy: 0, life: 0, maxLife: 30,
      };
      shootingStars.push(s);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. FLOATING DIAMONDS — spinning octahedrons
    // ═══════════════════════════════════════════════════════════════════════════
    const diamonds: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const size = Math.random() * 0.6 + 0.2;
      const geo = new THREE.OctahedronGeometry(size, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        transparent: true,
        opacity: Math.random() * 0.15 + 0.05,
        wireframe: Math.random() > 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 20
      );
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.008,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.012 + 0.005,
        baseY: mesh.position.y,
      };
      scene.add(mesh);
      diamonds.push(mesh);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. GLOWING ORBS
    // ═══════════════════════════════════════════════════════════════════════════
    const orbs: { mesh: THREE.Mesh; speed: number; angle: number; radius: number; baseY: number; floatSpeed: number; floatPhase: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 3 + 1.2, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: goldColors[i % goldColors.length],
        transparent: true, opacity: 0.025, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = Math.random() * 18 + 8;
      mesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 22, Math.sin(angle) * radius * 0.3 - 12);
      scene.add(mesh);
      orbs.push({ mesh, speed: Math.random() * 0.0003 + 0.0001, angle, radius, baseY: mesh.position.y, floatSpeed: Math.random() * 0.007 + 0.003, floatPhase: Math.random() * Math.PI * 2 });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 7. RINGS — thin rotating tori
    // ═══════════════════════════════════════════════════════════════════════════
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.TorusGeometry(Math.random() * 5 + 2, 0.012, 6, 70);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xc8a27d, transparent: true, opacity: Math.random() * 0.08 + 0.02,
        depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.004,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.008 + 0.003,
        baseY: mesh.position.y,
      };
      scene.add(mesh);
      rings.push(mesh);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 8. AURORA RIBBONS — sine-wave undulating lines
    // ═══════════════════════════════════════════════════════════════════════════
    const AURORA_SEGMENTS = 80;
    interface Aurora { line: THREE.Line; phase: number; speed: number; amplitude: number; baseY: number; frequency: number; }
    const auroras: Aurora[] = [];
    for (let r = 0; r < 4; r++) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= AURORA_SEGMENTS; i++) {
        pts.push(new THREE.Vector3((i / AURORA_SEGMENTS - 0.5) * 80, 0, -15 - r * 3));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: goldColors[r % goldColors.length],
        transparent: true, opacity: 0.04 + r * 0.01,
        depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      auroras.push({ line, phase: r * Math.PI * 0.5, speed: 0.008 + r * 0.003, amplitude: 3 + r * 1.5, baseY: (r - 2) * 8, frequency: 0.06 + r * 0.02 });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 9. BOKEH DISCS — soft floating circles
    // ═══════════════════════════════════════════════════════════════════════════
    const bokeh: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const geo = new THREE.CircleGeometry(Math.random() * 3 + 1, 32);
      const baseOpacity = Math.random() * 0.04 + 0.01;
      const mat = new THREE.MeshBasicMaterial({
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        transparent: true, opacity: baseOpacity,
        depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 15 - 8
      );
      mesh.userData = {
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.006 + 0.002,
        baseY: mesh.position.y,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        baseOpacity,
      };
      scene.add(mesh);
      bokeh.push(mesh);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═══════════════════════════════════════════════════════════════════════════
    let animId = 0;
    let time = 0;
    let targetRY = 0;
    let targetRX = 0;

    const dustPosAttr = dustGeo.attributes.position as THREE.BufferAttribute;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      time += 0.01;

      // Lerp parallax
      scene.rotation.y += (targetRY - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetRX - scene.rotation.x) * 0.05;

      // 1. Petals
      petals.forEach((p) => {
        p.position.y += p.userData.vy;
        p.position.x += p.userData.vx + Math.sin(time * p.userData.swaySpeed + p.userData.swayPhase) * 0.005;
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.z += p.userData.rotSpeedZ;
        if (p.position.y < -35) { p.position.y = 38; p.position.x = (Math.random() - 0.5) * 70; }
      });

      // 2. Dust
      const da = dustPosAttr.array as Float32Array;
      for (let i = 0; i < DUST_COUNT; i++) {
        da[i * 3 + 1] += dustVelocities[i].vy;
        da[i * 3] += dustVelocities[i].vx;
        if (da[i * 3 + 1] > 38) { da[i * 3 + 1] = -38; da[i * 3] = (Math.random() - 0.5) * 80; }
      }
      dustPosAttr.needsUpdate = true;
      dustMat.opacity = 0.3 + 0.2 * Math.sin(time * 0.4);

      // 3. Stars
      starMat.opacity = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(time * 1.2));
      starPoints.rotation.y += 0.0002;

      // 4. Shooting stars
      shootingStars.forEach((s) => {
        if (!s.active) {
          s.countdown--;
          if (s.countdown <= 0) resetShootingStar(s);
        } else {
          s.life++;
          const posArr = s.line.geometry.attributes.position as THREE.BufferAttribute;
          const tx = posArr.getX(0), ty = posArr.getY(0);
          posArr.setXYZ(0, tx + s.vx, ty + s.vy, posArr.getZ(0));
          posArr.setXYZ(1, tx + s.vx * 0.15, ty + s.vy * 0.15, posArr.getZ(1));
          posArr.needsUpdate = true;
          const prog = s.life / s.maxLife;
          const fade = prog < 0.3 ? prog / 0.3 : 1 - (prog - 0.3) / 0.7;
          (s.line.material as THREE.LineBasicMaterial).opacity = fade * 0.85;
          if (s.life >= s.maxLife) {
            s.active = false;
            s.countdown = Math.random() * 250 + 120;
            (s.line.material as THREE.LineBasicMaterial).opacity = 0;
          }
        }
      });

      // 5. Diamonds
      diamonds.forEach((d) => {
        d.rotation.x += d.userData.rotSpeedX;
        d.rotation.y += d.userData.rotSpeedY;
        d.rotation.z += d.userData.rotSpeedZ;
        d.position.y = d.userData.baseY + Math.sin(time * d.userData.floatSpeed + d.userData.floatPhase) * 2.5;
      });

      // 6. Orbs
      orbs.forEach((o) => {
        o.angle += o.speed;
        o.mesh.position.x = Math.cos(o.angle) * o.radius;
        o.mesh.position.y = o.baseY + Math.sin(time * o.floatSpeed + o.floatPhase) * 3.5;
        (o.mesh.material as THREE.MeshBasicMaterial).opacity =
          0.015 + 0.035 * (0.5 + 0.5 * Math.sin(time * o.floatSpeed + o.floatPhase));
      });

      // 7. Rings
      rings.forEach((r) => {
        r.rotation.x += r.userData.rotSpeedX;
        r.rotation.y += r.userData.rotSpeedY;
        r.position.y = r.userData.baseY + Math.sin(time * r.userData.floatSpeed + r.userData.floatPhase) * 2;
      });

      // 8. Aurora ribbons
      auroras.forEach((a) => {
        a.phase += a.speed;
        const posArr = a.line.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i <= AURORA_SEGMENTS; i++) {
          const x = (i / AURORA_SEGMENTS - 0.5) * 80;
          const y = a.baseY
            + Math.sin(i * a.frequency + a.phase) * a.amplitude
            + Math.sin(i * a.frequency * 0.4 + a.phase * 0.7) * (a.amplitude * 0.4);
          posArr.setXYZ(i, x, y, posArr.getZ(i));
        }
        posArr.needsUpdate = true;
        (a.line.material as THREE.LineBasicMaterial).opacity =
          0.03 + 0.025 * (0.5 + 0.5 * Math.sin(time * 0.3 + a.phase));
      });

      // 9. Bokeh
      bokeh.forEach((b) => {
        b.position.y = b.userData.baseY + Math.sin(time * b.userData.floatSpeed + b.userData.floatPhase) * 3;
        (b.material as THREE.MeshBasicMaterial).opacity =
          b.userData.baseOpacity * (0.5 + 0.5 * Math.sin(time * b.userData.pulseSpeed + b.userData.pulsePhase));
      });

      renderer.render(scene, camera);
    };

    loop();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Mouse Parallax ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetRY = ((e.clientX / window.innerWidth) - 0.5) * 0.08;
      targetRX = -((e.clientY / window.innerHeight) - 0.5) * 0.04;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
