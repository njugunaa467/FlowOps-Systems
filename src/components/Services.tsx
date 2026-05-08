"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Layers,
  ShoppingCart,
  Workflow,
  BarChart3,
  Brain,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Brain,
      title: "AI Automation",
      description: "Intelligent automation systems that eliminate manual work and accelerate operational speed.",
      tags: ["Machine Learning", "Workflow Automation", "Integration"],
    },
    {
      icon: Zap,
      title: "SaaS Systems",
      description: "High-performance web platforms built for scale, speed, and seamless user experiences.",
      tags: ["Next.js", "Performance", "Security"],
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Engineering",
      description: "Robust e-commerce platforms optimized for conversion, performance, and growth.",
      tags: ["Stripe Integration", "Analytics", "Optimization"],
    },
    {
      icon: Workflow,
      title: "Workflow Infrastructure",
      description: "Backend systems and APIs designed for enterprise scale and reliability.",
      tags: ["Backend", "APIs", "Infrastructure"],
    },
    {
      icon: BarChart3,
      title: "Dashboard Systems",
      description: "Custom business intelligence dashboards with real-time data visualization.",
      tags: ["Data Visualization", "Real-time", "Analytics"],
    },
    {
      icon: Layers,
      title: "Business Intelligence",
      description: "Strategic systems design and data-driven solutions to transform operations.",
      tags: ["Strategy", "Data", "Optimization"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-green/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
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
            What We Build
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Enterprise-grade solutions engineered to transform your operations and accelerate growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group glass-effect rounded-2xl p-8 hover:border-light-blue/50 transition-all duration-300"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(45, 125, 210, 0.15)",
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-6 inline-block p-4 bg-blue/10 rounded-xl group-hover:bg-blue/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-light-blue" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text mb-4 group-hover:text-light-blue transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 bg-light-blue/10 text-light-blue text-sm rounded-full border border-light-blue/20"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 125, 210, 0.2)" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Hover line */}
                <motion.div
                  className="mt-6 h-0.5 bg-gradient-to-r from-blue to-light-blue"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}