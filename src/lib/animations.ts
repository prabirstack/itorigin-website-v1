// Reusable animation variants for Motion.js (Framer Motion)
// These variants provide consistent animations across the entire application

import { Variants } from "motion/react";

// Fade in from bottom with customizable delay
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1], // Custom cubic bezier for smooth easing
    }
  })
};

// Fade in from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Simple fade in
export const fadeIn: Variants = {
  hidden: {
    opacity: 0
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
    }
  })
};

// Scale up with fade
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Container for stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Stagger children with larger delay
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    }
  }
};

// Stagger children with faster delay
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

// Slide in from bottom (for cards/panels)
export const slideInUp: Variants = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    }
  }
};

// Zoom in
export const zoomIn: Variants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
    }
  })
};

// Rotate in
export const rotateIn: Variants = {
  hidden: {
    rotate: -180,
    opacity: 0
  },
  visible: (delay = 0) => ({
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    }
  }
};

// Hover animations for cards
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
};

// Button hover animations
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  },
  tap: { scale: 0.95 }
};

// Number counter animation (for stats)
export const counterAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
};

// Reveal from overflow (used for text reveals)
export const revealFromOverflow: Variants = {
  hidden: {
    y: "100%",
  },
  visible: (delay = 0) => ({
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Blur in effect
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: delay,
    }
  })
};

// For images - fade in with slight zoom
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1],
    }
  }
};

// Draw line animation (for borders/underlines)
export const drawLine: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.22, 0.61, 0.36, 1],
    }
  })
};

// Pulse animation for attention
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Float animation (subtle up and down)
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Rotate continuously
export const rotate360 = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }
  }
};
