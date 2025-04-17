import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const geoUrl =
  'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

const getRandomBurden = () => Math.floor(Math.random() * 30) + 1;

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [burdenInfo, setBurdenInfo] = useState<{ name: string; burden: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false, // animate on enter AND exit
  });

  useEffect(() => {
    const checkDarkMode = () =>
      setIsDarkMode(document.documentElement.classList.contains('dark'));

    checkDarkMode(); // Initial check

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const lightColor = '#2563EB';
  const darkFill = '#374151';
  const lightFill = '#e5e7eb';

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6 sm:px-8 mb-10 relative z-10"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-6 text-center">
        Global Dementia Burden by Region
      </h2>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 overflow-hidden">
        <div className="w-full max-w-[1100px] mx-auto h-[500px] sm:h-[520px] relative">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 130 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const isSelected = selectedCountry === countryName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        setSelectedCountry(countryName);
                        setBurdenInfo({
                          name: countryName,
                          burden: getRandomBurden(),
                        });
                      }}
                      style={{
                        default: {
                          fill: isSelected
                            ? lightColor
                            : isDarkMode
                            ? darkFill
                            : lightFill,
                          stroke: isDarkMode ? '#9CA3AF' : '#6B7280',
                          strokeWidth: 0.3,
                        },
                        hover: {
                          fill: lightColor,
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: lightColor,
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Info box */}
          <AnimatePresence>
            {burdenInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md text-sm font-semibold text-primary-600 dark:text-white z-20"
 >
                {burdenInfo.name}: {burdenInfo.burden}M cases
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default WorldMap;
