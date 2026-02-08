import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Starfield({ count = 2000, mousePosition }: StarfieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Star colors (white with slight blue/purple tint)
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        // White
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        // Cyan tint
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else {
        // Purple tint
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      }
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle rotation
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;

    // Mouse parallax effect
    const targetRotX = mousePosition.current.y * 0.1;
    const targetRotY = mousePosition.current.x * 0.1;
    
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;
  });

  const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
  const colorAttr = useMemo(() => new THREE.BufferAttribute(colors, 3), [colors]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttr} />
        <primitive attach="attributes-color" object={colorAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Shooting stars component
function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    
    // Create shooting stars
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.ConeGeometry(0.1, 2, 4);
      const material = new THREE.MeshBasicMaterial({
        color: '#00F0FF',
        transparent: true,
        opacity: 0,
      });
      const star = new THREE.Mesh(geometry, material);
      star.rotation.z = -Math.PI / 4;
      stars.push(star);
      groupRef.current.add(star);
    }

    // Animate shooting stars
    const animateStar = (star: THREE.Mesh, delay: number) => {
      setTimeout(() => {
        const startX = 30 + Math.random() * 20;
        const startY = 20 + Math.random() * 10;
        const startZ = -20 - Math.random() * 20;
        
        star.position.set(startX, startY, startZ);
        
        const duration = 1000 + Math.random() * 500;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = elapsed / duration;
          
          if (progress < 1) {
            star.position.x = startX - progress * 60;
            star.position.y = startY - progress * 30;
            (star.material as THREE.MeshBasicMaterial).opacity = 
              progress < 0.2 ? progress * 5 : progress > 0.8 ? (1 - progress) * 5 : 1;
            requestAnimationFrame(animate);
          } else {
            (star.material as THREE.MeshBasicMaterial).opacity = 0;
            setTimeout(() => animateStar(star, Math.random() * 3000), Math.random() * 5000);
          }
        };
        
        animate();
      }, delay);
    };

    stars.forEach((star, i) => {
      animateStar(star, i * 2000);
    });

    return () => {
      stars.forEach(star => {
        star.geometry.dispose();
        (star.material as THREE.MeshBasicMaterial).dispose();
      });
    };
  }, []);

  return <group ref={groupRef} />;
}

export default function StarfieldBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Starfield count={1500} mousePosition={mousePosition} />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
