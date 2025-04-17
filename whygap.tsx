import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquare, FlaskConical } from "lucide-react";
import { useInView } from "react-intersection-observer";

const gapReasons = [
  {
    icon: AlertCircle,
    title: "Limited Access to Specialists",
    desc: "Rural and underserved areas often lack neurologists or memory care providers.",
  },
  {
    icon: MessageSquare,
    title: "Stigma and Lack of Awareness",
    desc: "Cultural beliefs and limited understanding delay diagnosis and treatment.",
  },
  {
    icon: FlaskConical,
    title: "Few Diagnostic Tools in Low-Income Regions",
    desc: "Resource-limited settings struggle to adopt new screening technologies.",
  },
];

const WhyTheGap = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false, // Let it animate again and again
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-8 mb-4"
    >
      <motion.h2
        key={shouldAnimate ? "visible" : "hidden"} // Force re-render to restart animation
        initial={{ opacity: 0, y: 40 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-primary-600 text-center mb-12"
      >
        Why the Gap?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {gapReasons.map((reason, idx) => {
          const Icon = reason.icon; // ✅ Capitalized component usage

          return (
            <motion.div
              key={shouldAnimate ? `visible-${idx}` : `hidden-${idx}`}
              initial={{ opacity: 0, y: 60 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
              }
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4 mx-auto">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {reason.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyTheGap;
