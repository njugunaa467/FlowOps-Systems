"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Check, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Automation Systems",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send inquiry");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Automation Systems",
        message: "",
      });

      // Auto-hide success message after 5 seconds, but keep form visible
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFieldFilled = (field: keyof typeof formData) => {
    return formData[field] && formData[field].toString().trim() !== "";
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send us an inquiry",
      action: "Contact Form Below",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Chat directly",
      action: "Floating Button",
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
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-green/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
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
            Let's Build <span className="text-light-blue">Together</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Ready to transform your business? Let's discuss your project and how we can help you scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Methods */}
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-8 text-center hover:border-light-blue/50 transition-all"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div className="inline-block mb-4" whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Icon className="w-12 h-12 text-light-blue" />
                </motion.div>
                <h3 className="text-xl font-bold text-text mb-2">{method.title}</h3>
                <p className="text-muted text-sm mb-4">{method.description}</p>
                <p className="text-xs text-light-blue font-semibold">{method.action}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Success Message - Always visible when success is true */}
        <AnimatePresence>
          {success && (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center mb-8 p-6 bg-green/10 border-2 border-green/40 rounded-2xl"
            >
              <motion.div
                className="inline-block mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green" />
                </div>
              </motion.div>
              <h4 className="text-xl font-bold text-green mb-2">✓ Inquiry Sent Successfully!</h4>
              <p className="text-muted text-sm mb-1">We'll review your project and get back to you within 24 hours.</p>
              <p className="text-xs text-muted/60">Check your email for confirmation and next steps.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form Section with Preview - Always visible */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Form Section */}
          <motion.div className="glass-effect rounded-2xl p-8 md:p-12 border-t-2 border-light-blue/30 h-fit">
            <motion.h3 variants={item} className="text-2xl font-bold text-text mb-8">
              Your Project Details
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                  Full Name <span className="text-red-500">*</span>
                  {isFieldFilled("name") && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </motion.div>
                  )}
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-navy/30 border-2 rounded-lg text-text placeholder-muted/40 focus:outline-none transition-all ${
                    isFieldFilled("name")
                      ? "border-green/50 focus:border-green bg-green/5"
                      : "border-light-blue/20 focus:border-light-blue"
                  }`}
                  placeholder="John Doe"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                  Email Address <span className="text-red-500">*</span>
                  {isFieldFilled("email") && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </motion.div>
                  )}
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-navy/30 border-2 rounded-lg text-text placeholder-muted/40 focus:outline-none transition-all ${
                    isFieldFilled("email")
                      ? "border-green/50 focus:border-green bg-green/5"
                      : "border-light-blue/20 focus:border-light-blue"
                  }`}
                  placeholder="john@company.com"
                />
              </motion.div>

              {/* Company */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                  Company Name
                  {isFieldFilled("company") && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </motion.div>
                  )}
                </label>
                <motion.input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-navy/30 border-2 rounded-lg text-text placeholder-muted/40 focus:outline-none transition-all ${
                    isFieldFilled("company")
                      ? "border-green/50 focus:border-green bg-green/5"
                      : "border-light-blue/20 focus:border-light-blue"
                  }`}
                  placeholder="Your company"
                />
              </motion.div>

              {/* Project Type */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-text mb-2">
                  Project Type
                </label>
                <motion.select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-navy/30 border-2 border-light-blue/20 rounded-lg text-text focus:outline-none focus:border-light-blue transition-all cursor-pointer"
                >
                  <option>Automation Systems</option>
                  <option>SaaS Development</option>
                  <option>E-Commerce Platform</option>
                  <option>Workflow Infrastructure</option>
                  <option>Dashboard Systems</option>
                  <option>Business Intelligence</option>
                  <option>Other</option>
                </motion.select>
              </motion.div>

              {/* Message */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-text mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    Project Details <span className="text-red-500">*</span>
                    {isFieldFilled("message") && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-4 h-4 text-green" />
                      </motion.div>
                    )}
                  </span>
                  <span className="text-xs text-muted">{formData.message.length}/500</span>
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-navy/30 border-2 rounded-lg text-text placeholder-muted/40 focus:outline-none transition-all resize-none ${
                    isFieldFilled("message")
                      ? "border-green/50 focus:border-green bg-green/5"
                      : "border-light-blue/20 focus:border-light-blue"
                  }`}
                  placeholder="Tell us about your project, challenges, and goals..."
                  maxLength={500}
                />
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    variants={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div variants={item}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue to-light-blue text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                </motion.button>
              </motion.div>

              <motion.p variants={item} className="text-xs text-muted text-center">
                We typically respond within 24 hours during business hours.
              </motion.p>
            </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            variants={item}
            className="glass-effect rounded-2xl p-8 md:p-12 border-l-2 border-light-blue/30 h-fit sticky top-24"
          >
            <h3 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-light-blue" />
              Preview
            </h3>

            <div className="space-y-6">
              {/* Preview Card */}
              <div className="bg-navy/20 rounded-xl p-6 border border-light-blue/20">
                <p className="text-xs text-muted uppercase tracking-wider mb-4">YOUR INQUIRY</p>

                {/* Name Preview */}
                <div className="mb-4">
                  <p className="text-xs text-muted/60 mb-1">FROM</p>
                  <p className={`text-sm font-semibold ${isFieldFilled("name") ? "text-green" : "text-muted/40"}`}>
                    {formData.name || "Your name"}
                  </p>
                </div>

                {/* Email Preview */}
                <div className="mb-4">
                  <p className="text-xs text-muted/60 mb-1">REPLY TO</p>
                  <p className={`text-sm font-semibold ${isFieldFilled("email") ? "text-light-blue" : "text-muted/40"}`}>
                    {formData.email || "your@email.com"}
                  </p>
                </div>

                {/* Company Preview */}
                {isFieldFilled("company") && (
                  <div className="mb-4">
                    <p className="text-xs text-muted/60 mb-1">COMPANY</p>
                    <p className="text-sm font-semibold text-text">{formData.company}</p>
                  </div>
                )}

                {/* Project Type Preview */}
                <div className="mb-4">
                  <p className="text-xs text-muted/60 mb-1">PROJECT TYPE</p>
                  <p className="text-sm font-semibold text-light-blue">{formData.projectType}</p>
                </div>

                {/* Message Preview */}
                {isFieldFilled("message") && (
                  <div className="mb-4 pt-4 border-t border-light-blue/10">
                    <p className="text-xs text-muted/60 mb-2">MESSAGE</p>
                    <p className="text-sm text-text/80 leading-relaxed line-clamp-4">{formData.message}</p>
                    {formData.message.length > 150 && (
                      <p className="text-xs text-muted/60 mt-2">...and more</p>
                    )}
                  </div>
                )}
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                <p className="text-xs text-muted uppercase tracking-wider mb-3">REQUIRED FIELDS</p>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${isFieldFilled("name") ? "text-green" : "text-muted/60"}`}>
                    {isFieldFilled("name") ? (
                      <CheckCircle2 className="w-4 h-4 text-green flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 border border-muted/40 rounded-full" />
                    )}
                    Full Name
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isFieldFilled("email") ? "text-green" : "text-muted/60"}`}>
                    {isFieldFilled("email") ? (
                      <CheckCircle2 className="w-4 h-4 text-green flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 border border-muted/40 rounded-full" />
                    )}
                    Email Address
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isFieldFilled("message") ? "text-green" : "text-muted/60"}`}>
                    {isFieldFilled("message") ? (
                      <CheckCircle2 className="w-4 h-4 text-green flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 border border-muted/40 rounded-full" />
                    )}
                    Project Details
                  </div>
                </div>
              </div>

              {/* Info Message */}
              <div className="text-xs text-muted/60 p-3 bg-light-blue/5 rounded-lg border border-light-blue/10">
                All information is encrypted and secure. We'll never share your details.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
