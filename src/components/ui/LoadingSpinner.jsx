import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const LoadingSpinner = ({ size = 20, className = '', text }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-primary"
      >
        <Icon name="Loader2" size={size} />
      </motion.div>
      {text && (
        <p className="text-sm text-muted-foreground mt-2">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;