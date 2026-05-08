"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2 } from "lucide-react";

export default function Work() {
  const caseStudies = [
    {
      client: "TechVenture Inc",
      industry: "SaaS / Enterprise Software",
      challenge: "Manual operational workflows causing 40% time waste and scaling bottlenecks",
      solution: "Built AI-powered automation system connecting CRM, project management, and billing platforms",
      outcome: "70% automation improvement • 3x operational speed • $200K annual savings",
      technologies: ["Node.js", "Python", "Zapier", "PostgreSQL", "React"],
      icon: TrendingUp,
    },
    {
      client: "Digital Commerce Co",
      industry: "E-commerce & Logistics",
      challenge: "Fragmented systems between inventory, orders, and fulfillment across 5 warehouses",
      solution: "Engineered unified digital infrastructure with real-time synchronization and analytics dashboard",
      outcome: "Real-time inventory sync • 85% faster order processing • 98% accuracy",
      technologies: ["Next.js", "GraphQL", "Kubernetes", "Redis", "BigQuery"],
      icon: CheckCircle2,
    },
    {
      client: "FinanceFlow Partners",
      industry: "Financial Services",
      challenge: "Legacy systems slowing down client reporting and limiting scalability",
      solution: "Designed and deployed modern web platform with AI-powered financial analysis and automation",
      outcome: "80% faster reporting • 60% manual work reduction • Scaled to 1000+ clients",
      technologies: ["TypeScript", "AWS", "Machine Learning", "REST APIs", "React"],
      icon: TrendingUp,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="work" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0], x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            Work & Case Studies
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Real projects, real results. See how we've transformed businesses across industries.
          </p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group glass-effect rounded-2xl overflow-hidden hover:border-light-blue/50 transition-all"
                whileHover={{ y: -5 }}
              >
                {/* Header Bar */}
                <div className="h-1 bg-gradient-to-r from-blue via-light-blue to-green" />

                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-12">
                    {/* Left: Project Info */}
                    <div className="md:col-span-1">
                      <motion.div
                        className="inline-block mb-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Icon className="w-12 h-12 text-light-blue" />
                      </motion.div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-light-blue mb-1">
                            {study.client}
                          </h3>
                          <p className="text-sm text-muted">{study.industry}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-muted mb-2">TECHNOLOGIES</p>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-blue/10 text-light-blue text-xs rounded border border-blue/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Challenge & Solution */}
                    <div className="md:col-span-1 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-muted mb-2 uppercase tracking-wide">
                          Challenge
                        </h4>
                        <p className="text-text leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-light-blue/20 to-transparent md:hidden" />

                      <div>
                        <h4 className="text-sm font-bold text-muted mb-2 uppercase tracking-wide">
                          Solution
                        </h4>
                        <p className="text-text leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right: Outcomes */}
                    <div className="md:col-span-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-light-blue/20 to-transparent md:hidden mb-6" />

                      <h4 className="text-sm font-bold text-muted mb-4 uppercase tracking-wide">
                        Results
                      </h4>
                      <div className="space-y-2">
                        {study.outcome.split(" • ").map((metric, metricIndex) => (
                          <motion.div
                            key={metricIndex}
                            className="p-3 bg-green/5 rounded-lg border border-green/20"
                            whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                          >
                            <p className="text-sm font-semibold text-green">
                              ✓ {metric}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted mb-6">
            Ready to transform your business like these companies?
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue to-light-blue text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}