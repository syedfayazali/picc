import { motion } from 'framer-motion';
import { Train } from 'lucide-react';

const MetroBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-950/10" />
      
      {/* Animated train 1 */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ 
          x: window.innerWidth + 100,
          transition: { 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="absolute top-[20%]"
      >
        <Train className="h-8 w-8 text-blue-500/30" />
      </motion.div>

      {/* Animated train 2 */}
      <motion.div
        initial={{ x: window.innerWidth + 100 }}
        animate={{ 
          x: -100,
          transition: { 
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }
        }}
        className="absolute top-[60%]"
      >
        <Train className="h-8 w-8 text-blue-500/30" />
      </motion.div>

      {/* Metro lines */}
      <div className="absolute inset-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent absolute w-full top-[20%]" />
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent absolute w-full top-[60%]" />
      </div>
    </div>
  );
};

export default MetroBackground;