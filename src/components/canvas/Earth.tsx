import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload } from '@react-three/drei';
import CanvasLoader from '../layout/Loader';

const Earth = () => {

   const earth = useGLTF('/3D_PortfolioTemplate/planet/scene.gltf');

   return (
      <primitive
         object={earth.scene}
         scale={2.5}
         position-y={0}
         rotation-y={0}
      />
   );
};

const EarthCanvas = () => {
   return (
      <Canvas
         shadows
         frameloop='always'
         gl={{ preserveDrawingBuffer: true }}
         camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-5, 3, 6],
         }}
      >
         <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
               autoRotate
               enableZoom={false}
               maxPolarAngle={Math.PI / 2}
               minPolarAngle={Math.PI / 2}
            />
            <Earth />
         </Suspense>
         <Preload all />
      </Canvas>
   );
};

export default EarthCanvas;
