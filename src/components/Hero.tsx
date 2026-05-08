"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full pt-24 pb-20 overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/3 w-96 h-96 bg-green/10 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(77,166,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(77,166,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Main Heading */}
        <motion.div variants={item}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-text via-light-blue to-green bg-clip-text text-transparent">
              We Build Systems That
            </span>
            <br />
            <span className="text-text">Scale Businesses</span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-8"
        >
          FlowOps Systems engineers automation systems, digital infrastructure, AI workflows, and modern web platforms
          for ambitious businesses ready to scale.
        </motion.p>

        {/* Metrics Row */}
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-4 mb-12 my-12"
        >
          {[
            { number: "40+", label: "Systems Built" },
            { number: "95%", label: "Client Retention" },
            { number: "3x", label: "Efficiency Gain" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4 glass-effect rounded-lg"
              whileHover={{ y: -5, borderColor: "rgba(77, 166, 255, 0.5)" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-light-blue mb-2">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={() => scrollToSection("#contact")}
            className="px-8 py-4 bg-gradient-to-r from-blue to-light-blue text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("#services")}
            className="px-8 py-4 border-2 border-light-blue text-light-blue rounded-full font-semibold text-lg hover:bg-light-blue/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          variants={item}
          className="text-sm text-muted"
        >
          Trusted by ambitious businesses • Enterprise automation • AI-powered workflows • Digital infrastructure
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-light-blue rounded-full flex items-center justify-center">
          <motion.div
            className="w-1 h-2 bg-light-blue rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}