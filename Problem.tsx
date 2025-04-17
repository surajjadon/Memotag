import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Brain, Clock } from "lucide-react";
import { useInView } from "react-intersection-observer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { year: "1980", value: 15 + Math.floor(Math.random() * 5) },
  { year: "1982", value: 16 + Math.floor(Math.random() * 5) },
  { year: "1984", value: 17 + Math.floor(Math.random() * 5) },
  { year: "1986", value: 58 + Math.floor(Math.random() * 5) },
  { year: "1988", value: 19 + Math.floor(Math.random() * 5) },
  { year: "1990", value: 20 + Math.floor(Math.random() * 5) },
  { year: "1992", value: 22 + Math.floor(Math.random() * 5) },
  { year: "1994", value: 24 + Math.floor(Math.random() * 5) },
  { year: "1996", value: 16 + Math.floor(Math.random() * 5) },
  { year: "1998", value: 28 + Math.floor(Math.random() * 5) },
  { year: "2000", value: 30 + Math.floor(Math.random() * 5) },
  { year: "2002", value: 12 + Math.floor(Math.random() * 5) },
  { year: "2004", value: 34 + Math.floor(Math.random() * 5) },
  { year: "2006", value: 36 + Math.floor(Math.random() * 5) },
  { year: "2008", value: 38 + Math.floor(Math.random() * 5) },
  { year: "2010", value: 25 + Math.floor(Math.random() * 5) },
  { year: "2012", value: 42 + Math.floor(Math.random() * 5) },
  { year: "2014", value: 44 + Math.floor(Math.random() * 5) },
  { year: "2016", value: 46 + Math.floor(Math.random() * 5) },
  { year: "2018", value: 58 + Math.floor(Math.random() * 5) },
  { year: "2020", value: 78 + Math.floor(Math.random() * 5) },
  { year: "2022", value: 52 + Math.floor(Math.random() * 5) },
  { year: "2024", value: 45 + Math.floor(Math.random() * 5) },
];

const stats = [
  {
    icon: Users,
    number: 50_000_000,
    display: "50,000,000+",
    label: "Global Dementia Cases",
    description: "Expected to triple by 2050",
  },
  {
    icon: Brain,
    number: 60,
    display: "60%",
    label: "Early Detection Impact",
    description: "Better outcomes with early intervention",
  },
  {
    icon: Clock,
    number: 11_700_000_000,
    display: "11,700,000,000",
    label: "Hours of Care",
    description: "Provided by caregivers annually",
  },
];

const AnimatedNumber = ({
  target,
  display,
  shouldAnimate,
}: {
  target: number;
  display: string;
  shouldAnimate: boolean;
}) => {
  const [count, setCount] = useState<string>("0");

  useEffect(() => {
    if (!shouldAnimate) return;

    setCount("0");
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentCount = Math.floor(target * progress);

      setCount(currentFrame === totalFrames ? display : currentCount.toLocaleString());

      if (currentFrame === totalFrames) clearInterval(counter);
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [shouldAnimate, target, display]);

  return <span>{count}</span>;
};

const Problem = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    setShowGraph(inView);
  }, [inView]);

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 text-primary-600">
            The Growing Challenge
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dementia affects millions globally, creating significant challenges for patients, families, and healthcare systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                <AnimatedNumber target={stat.number} display={stat.display} shouldAnimate={inView} />
              </h3>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{stat.label}</p>
              <p className="text-gray-600 dark:text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        >
          <h3 className="text-2xl font-semibold text-gray-900 text-primary-600 flex justify-center items-center mb-3">
            Dementia Cases Over Time
          </h3>
          <div style={{ height: "400px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {showGraph && (
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={4}
                    dot={{ r: 6, strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={4500}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;