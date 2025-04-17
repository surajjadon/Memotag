import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import girlAnimation from '../video/girl.json';
import boyAnimation from '../video/boy.json';

const CTA = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    country: '',
    product: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        country: '',
        product: '',
      });
    }, 3000);
  };

  return (
    <section className="bg-[#f0eff8] dark:bg-gray-900 transition-colors duration-500">
      <div
        className="relative text-white py-32 overflow-hidden"
        style={{
          backgroundImage: "url('/images/parallax-bg.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Box Wrapper for Center Text */}
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="p-8 rounded-lg bg-primary-700 text-white ">
            {/* Center Text */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Get your free trial</h2>
            <p className="text-sm sm:text-base">
              Get in touch with our experts to learn more about how <br />
              Memotag can support you.
            </p>
          </div>
        </div>

        {/* Left Lottie - Girl */}
        <div className="absolute bottom-0 left-0 transform -rotate-6 translate-y-10 z-0 w-40 sm:w-72 sm:h-72">
          <Lottie animationData={girlAnimation} loop={true} />
        </div>

        {/* Right Lottie - Boy */}
        <div className="absolute bottom-0 right-0 transform rotate-6 translate-y-10 z-0 w-40 sm:w-72 sm:h-72">
          <Lottie animationData={boyAnimation} loop={true} />
        </div>
      </div>

      {/* Form Section */}
      <div ref={ref} className="py-10 px-4">
        <div className="max-w-xl sm:max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg transition-all">
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-green-600 font-semibold dark:text-green-400"
            >
              Form submitted successfully!
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                name="firstName"
                placeholder="First name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="lastName"
                placeholder="Last name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="email"
                placeholder="Email*"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="phone"
                placeholder="Phone number*"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="company"
                placeholder="Company name*"
                value={formData.company}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="jobTitle"
                placeholder="Job title*"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="input"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Country*</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="UK">UK</option>
              </select>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Product/s of interest*</option>
                <option value="Product A">Product A</option>
                <option value="Product B">Product B</option>
              </select>
              <div className="sm:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#4b3fbb] text-white font-semibold transition-colors hover:bg-[#3f34a1]"
                >
                  Submit
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
