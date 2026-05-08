"use client";

import { motion } from "framer-motion";
import { Check, Zap, Users, Shield } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Systems Built", value: "40+" },
    { label: "Client Retention", value: "95%" },
    { label: "Avg Efficiency Gain", value: "3x" },
    { label: "Years Experience", value: "10+" },
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

  const trustItems = [
    { icon: Zap, text: "Enterprise-grade solutions" },
    { icon: Users, text: "24/7 Technical support" },
    { icon: Shield, text: "Proven track record" },
    { icon: Check, text: "Transparent communication" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-width-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={item}>
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                We Build Systems <br />
                <span className="bg-gradient-to-r from-light-blue to-green bg-clip-text text-transparent">
                  That Last
                </span>
              </h2>

              <p className="text-muted text-lg leading-relaxed">
                FlowOps Systems is built on a simple principle: great systems transform businesses.
              </p>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-light-blue mb-2">
                  Our Philosophy
                </h3>
                <p className="text-muted leading-relaxed">
                  We don't build generic solutions. Every system is engineered specifically for your business,
                  your team, and your growth trajectory. We combine strategic thinking with technical excellence
                  to deliver automation systems that actually work.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-light-blue mb-2">
                  What We Do
                </h3>
                <p className="text-muted leading-relaxed">
                  We engineer enterprise-grade automation systems, digital infrastructure, AI workflows, and web platforms
                  that eliminate manual work, accelerate operations, and unlock new revenue streams for ambitious businesses.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-sm text-muted italic">
                "Every business has untapped potential in their operations. We help you unlock it."
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="glass-effect rounded-2xl p-6 hover:border-light-blue/50 transition-all"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue to-light-blue bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <motion.div variants={item} className="space-y-3">
              {trustItems.map((trustItem, index) => {
                const Icon = trustItem.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 glass-effect rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <Icon className="w-5 h-5 text-green flex-shrink-0" />
                    <span className="text-text text-sm">{trustItem.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-12 glass-effect rounded-2xl border-l-4 border-light-blue text-center"
        >
          <h3 className="text-2xl font-bold text-text mb-4">
            Ready to Build Systems That Scale?
          </h3>
          <p className="text-muted mb-6 max-w-2xl mx-auto">
            Let's talk about your business challenges and how we can transform them into competitive advantages through intelligent automation.
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue to-light-blue text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}