import { motion } from 'framer-motion';
import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';
import { type ComponentType } from 'react';

const SectionWrapper = <P extends object>(Component: ComponentType<P>, idName: string) =>
   function HOC(props: P) {
      return (
         <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
         >
            <span id={idName} className="hash-span">&nbsp;</span>
            <Component {...props} />
         </motion.section>
      );
   };

export default SectionWrapper;
