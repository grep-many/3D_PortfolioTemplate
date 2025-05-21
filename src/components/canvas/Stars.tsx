import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import type * as THREE from 'three';

const Stars = (props:any) => {

   const ref = useRef<THREE.Points>(null);
   const sphere =random.inSphere(new Float32Array(6000), { radius: 1.2 });

   useFrame((_, delta) => {
      if (ref.current) {
         ref.current.rotation.x -= delta / 10;
         ref.current.rotation.y -= delta / 15;
      }
   });

   return (
      <group rotation={[0, 0, Math.PI/4]}>
         <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
            <PointMaterial
               transparent
               color="#f272c8"
               size={0.002}
               sizeAttenuation
               depthWrite={false}
            />
         </Points>
      </group>
   );
};

const StarsCanvas = () => {
   return (
      <div className="h-auto w-full absolute inset-0 z-[-1]">
         <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
               <Stars />
            </Suspense>
            <Preload all />
         </Canvas>
      </div>
   );
};

export default StarsCanvas;
