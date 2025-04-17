import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeartbeat, FaHospital, FaStethoscope, FaShieldAlt } from 'react-icons/fa'; // Example icons

const stats = [
  { number: 1000, label: 'Caregivers Onboarded' },
  { number: 15, label: 'Clinical Pilots' },
  { number: 95, label: 'User Satisfaction' },
  { number: 24, label: 'Monitoring Coverage (Hours)' }
];

const partnerNames = [
  { name: 'Alpha Health', icon: <FaHeartbeat />, bgColor: 'bg-blue-500', hoverColor: 'bg-red-500' },
  { name: 'Medicu', icon: <FaHospital />, bgColor: 'bg-green-500', hoverColor: 'bg-yellow-500' },
  { name: 'CarePlus', icon: <FaStethoscope />, bgColor: 'bg-purple-500', hoverColor: 'bg-pink-500' },
  { name: 'HealthTrack', icon: <FaShieldAlt />, bgColor: 'bg-orange-500', hoverColor: 'bg-teal-500' }
];

const Traction = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [currentValue, setCurrentValue] = useState({
    caregivers: 0,
    pilots: 0,
    satisfaction: 0,
    coverage: 0
  });

  useEffect(() => {
    if (inView) {
      const interval1 = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev.caregivers < stats[0].number) {
            return { ...prev, caregivers: prev.caregivers + 1 };
          } else {
            clearInterval(interval1);
            return prev;
          }
        });
      }, 10);

      const interval2 = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev.pilots < stats[1].number) {
            return { ...prev, pilots: prev.pilots + 1 };
          } else {
            clearInterval(interval2);
            return prev;
          }
        });
      }, 100);

      const interval3 = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev.satisfaction < stats[2].number) {
            return { ...prev, satisfaction: prev.satisfaction + 1 };
          } else {
            clearInterval(interval3);
            return prev;
          }
        });
      }, 10);

      const interval4 = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev.coverage < stats[3].number) {
            return { ...prev, coverage: prev.coverage + 1 };
          } else {
            clearInterval(interval4);
            return prev;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
      };
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Making Real Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of caregivers who trust MemoTag for better dementia care.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {index === 0 && currentValue.caregivers}
                {index === 1 && currentValue.pilots}
                {index === 2 && currentValue.satisfaction}
                {index === 3 && currentValue.coverage}
                {index === 2 && '%'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
          {partnerNames.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-24 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg transition-all cursor-pointer hover:shadow-2xl"
            >
              <div
                className={`w-16 h-16 ${partner.bgColor} text-white rounded-full flex items-center justify-center mb-3 transition-all cursor-pointer duration-200 ease-in-out hover:${partner.hoverColor}`}
              >
                {partner.icon}
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg cursor-pointer transition-all duration-200 ease-in-out">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Traction;