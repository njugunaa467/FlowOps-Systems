"use client";

import { motion } from "framer-motion";
import { Lightbulb, Cpu, Zap, Rocket, TrendingUp } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: 1,
      title: "Discover",
      description: "Deep dive into your business, systems, and challenges. Understanding your vision and constraints.",
      icon: Lightbulb,
    },
    {
      number: 2,
      title: "Architect",
      description: "Design scalable, intelligent solutions. Planning systems that grow with your business.",
      icon: Cpu,
    },
    {
      number: 3,
      title: "Build",
      description: "Build premium, production-grade systems. Rigorous testing and quality assurance.",
      icon: Zap,
    },
    {
      number: 4,
      title: "Automate",
      description: "Integrate AI, workflows, and smart processes. Eliminate manual work.",
      icon: Rocket,
    },
    {
      number: 5,
      title: "Scale",
      description: "Deploy, monitor, and optimize. Continuous improvement and growth support.",
      icon: TrendingUp,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-green/10 rounded-full blur-3xl -translate-y-1/2"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-width-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text">
            Our Process
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A proven methodology to deliver systems that scale your business.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Animated connecting line */}
          <motion.div
            className="absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-light-blue/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={item}
                  className="group relative"
                >
                  {/* Card */}
                  <motion.div
                    className="glass-effect rounded-2xl p-6 h-full flex flex-col hover:border-light-blue/50 transition-all"
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(45, 125, 210, 0.15)",
                    }}
                  >
                    {/* Number Circle */}
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-blue to-light-blue flex items-center justify-center mb-4 mx-auto"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {step.number}
                      </span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="mb-4 text-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Icon className="w-8 h-8 text-light-blue mx-auto" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text text-center mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted text-center leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {/* Glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-blue/5 -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>

                  {/* Connector line (horizontal on desktop) */}
                  {step.number < steps.length && (
                    <motion.div
                      className="hidden md:block absolute top-1/3 left-full w-4 h-0.5 bg-gradient-to-r from-light-blue/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: step.number * 0.1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted mb-6">
            Let's start your transformation journey today.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue to-light-blue text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Discovery Call
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}