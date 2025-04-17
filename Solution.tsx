import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import aImage from './image/a.png';
import bImage from './image/b.png';

const steps = [
  {
    title: 'Physical Tracking',
    description: 'Tracks your location and surroundings in real-time.',
    imageUrl: aImage
  },
  {
    title: 'Cognitive Tracking',
    description: 'Monitors memory patterns and emotional responses.',
    imageUrl: bImage
  },
  {
    title: 'Seamless Integration',
    description: 'Combines physical and cognitive data for a unified experience.',
    imageUrl: aImage
  }
];

const Solution = () => {
  const [ref, inView] = useInView({
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-400 text-primary-600 mb-4">
            How MemoTag Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive support for dementia care through innovative technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const [stepRef, stepInView] = useInView({
              threshold: 0.1
            });

            return (
              <motion.div
                ref={stepRef}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                {/* Image with subtle up-down animation */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="mb-4"
                >
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="w-32 md:w-40 lg:w-48 h-auto mx-auto"
                  />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-bold text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>

                <a
                  href="#learn-more"
                  className="inline-block mt-4 py-2 px-6 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all"
                >
                  Learn More
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;