import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Tilt } from 'react-tilt';

const Modal: React.FC<ModalProps> = ({
   title,
   message,
   isError,
   setIsModalVisible,
}) => {

   const modalRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            modalRef.current &&
                !modalRef.current.contains(event.target as Node)
         ) {
            setIsModalVisible(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setIsModalVisible]);

   return (
      <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.5, ease: 'easeInOut' }}
         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
         <Tilt
            options={{
               max: 45,
               scale: 1,
               speed: 450,
            }}
            className={`bg-black-200 p-10 rounded-3xl w-80 md:w-96 shadow-lg border ${isError
               ? 'border-red-500'
               : 'border-green-500'
            }`}
         >
            <div ref={modalRef}>
               <div className="text-center">
                  <h2
                     className={`text-2xl font-semibold mb-2 ${isError ? 'text-red-500' : 'text-green-500'
                     }`}
                  >
                     {title}
                  </h2>
                  <p className="text-secondary text-sm">{message}</p>
               </div>

               <div className="text-center mt-6">
                  <button
                     onClick={() => setIsModalVisible(false)}
                     className={`py-2 px-6 rounded-lg text-white font-semibold transition duration-300 border ${isError
                        ? 'border-red-500 hover:bg-red-600'
                        : 'border-green-500 hover:bg-green-600'
                     }`}
                  >
                     {isError ? 'Retry!' : 'Okay.'}
                  </button>
               </div>
            </div>
         </Tilt>
      </motion.div>
   );
};

export default Modal;
