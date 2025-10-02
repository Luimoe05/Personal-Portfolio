import React from 'react';
import { motion } from 'framer-motion';

const AnimateIn = ({ children, delay = 0, duration = 0.5, y = 20 }) => {
  return (
    <motion.div
      // 1. Initial State (off-screen/invisible)
      initial={{ opacity: 0, y: y }}
      
      // 2. Animation Target State (final position)
      animate={{ opacity: 1, y: 0 }}
      
      // 3. Transition Properties (smooth timing)
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.17, 0.67, 0.83, 0.67], // Custom easing for a smooth, natural feel
      }}
      // 4. Stop when scrolling/unmounting
      exit={{ opacity: 0, y: -y }} 
    >
      {children}
    </motion.div>
  );
};

export default AnimateIn;