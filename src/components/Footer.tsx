"use client";

import { motion } from "framer-motion";
import Animatedlogo from "./Animatedlogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Web Systems", href: "#services" },
        { label: "AI Automation", href: "#services" },
        { label: "Infrastructure", href: "#services" },
        { label: "Consulting", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Email", href: "mailto:njugunaa467@gmail.com" },
        { label: "WhatsApp", href: "https://wa.me/254793638107" },
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
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
    <footer className="relative overflow-hidden bg-navy/30">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-blue/50 to-transparent" />

      {/* Background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-width-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-24 px-6 grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="mb-4 cursor-pointer">
              <Animatedlogo />
            </motion.div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Engineering enterprise-grade automation systems and digital infrastructure for ambitious businesses.
            </p>
            <p className="text-muted/60 text-xs">
              Build. Automate. Flow.
            </p>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:col-span-3 grid grid-cols-3 gap-8"
          >
            {footerLinks.map((column, index) => (
              <motion.div key={index} variants={item}>
                <h4 className="font-bold text-text mb-4 text-sm uppercase tracking-wider">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 4 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted hover:text-light-blue transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-light-blue/10 px-6 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted text-sm">
              © {currentYear} FlowOps Systems. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {[
                { name: "Twitter", emoji: "𝕏" },
                { name: "LinkedIn", emoji: "in" },
                { name: "GitHub", emoji: "⚙️" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full border border-light-blue/20 flex items-center justify-center text-light-blue hover:bg-light-blue/10 transition-all text-xs font-bold"
                  whileHover={{ scale: 1.1, borderColor: "rgba(77, 166, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.emoji}
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#"
              className="text-muted hover:text-light-blue transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}