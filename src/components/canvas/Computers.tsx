import { type FC, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../layout/Loader';

const Computers: FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {

   const computer = useGLTF('/3D_PortfolioTemplate/desktop_pc/scene.gltf');

   return (
      <mesh>
         <hemisphereLight intensity={0.15} groundColor="black" />
         <pointLight intensity={10} position={[0, -0.2, 0]} />
         <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={2000}
            castShadow
            shadow-mapSize={1024}
         />
         <primitive
            object={computer.scene}
            scale={isMobile?0.7:0.75}
            position={isMobile?[0, -3, -2.2]:[0, -3.25, -1.5]}
            rotation={[-0.01, -0.2, -0.1]}
         />
      </mesh>
   );
};

const ComputersCanvas = () => {

   const [isMobile, setIsMobile] = useState<boolean>(false);

   useEffect(()=>{
      const mediaQuery = window.matchMedia('(max-width:500px)');
      setIsMobile(mediaQuery.matches);

      const handleMediaQueryChange = (event:MediaQueryListEvent)=>{
         setIsMobile(event.matches);
      };

      mediaQuery.addEventListener('change', handleMediaQueryChange);

      return (()=>mediaQuery.removeEventListener('change', handleMediaQueryChange));
   }, []);

   return (
      <Canvas
         frameloop="demand"
         shadows
         camera={{ position: [20, 3, 5], fov: 25 }}
         gl={{ preserveDrawingBuffer: true }}
      >
         <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
               enableZoom={false}
               maxPolarAngle={Math.PI / 2}
               minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile}/>
         </Suspense>
         <Preload all />
      </Canvas>
   );
};

export default ComputersCanvas;
