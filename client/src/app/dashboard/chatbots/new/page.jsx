"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaRobot, FaRegCommentDots, FaPalette, FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import { createChatbot } from "@/services/chatbot.service";

const steps = [
  { id: 1, title: "Identity", icon: <FaRobot className="w-5 h-5" /> },
  { id: 2, title: "Conversation", icon: <FaRegCommentDots className="w-5 h-5" /> },
  { id: 3, title: "Widget", icon: <FaPalette className="w-5 h-5" /> },
];

export default function NewChatbotWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    personality: "friendly",
    greeting: "Hi! How can I help you today?",
    fallback: "I am not sure about that. Would you like to speak with a human?",
    widget_color: "#1D9E75",
    widget_position: "bottom-right",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.name.trim()) {
      setError("Please provide a name for your chatbot.");
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await createChatbot(formData);
      router.push(`/dashboard/chatbots/${response.data.id}?created=true`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Create your Chatbot</h1>
        <p className="text-gray-400">Set up the core unit of your AI customer support in just 3 steps.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 -z-10 rounded-full">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-[#0F1115] px-2">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                currentStep >= step.id
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400"
              }`}
            >
              {currentStep > step.id ? <FaCheck className="w-5 h-5" /> : step.icon}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStep >= step.id ? "text-emerald-400" : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-[#1A1D24] border border-gray-800 rounded-2xl p-8 shadow-xl min-h-[400px] flex flex-col">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chatbot Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Aria Support"
                    className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  <p className="mt-2 text-xs text-gray-500">Internal name for this chatbot.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Personality
                  </label>
                  <select
                    name="personality"
                    value={formData.personality}
                    onChange={handleChange}
                    className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                  >
                    <option value="friendly">Friendly (Approachable & helpful)</option>
                    <option value="formal">Formal (Professional & direct)</option>
                    <option value="concise">Concise (Short & to the point)</option>
                    <option value="empathetic">Empathetic (Caring & understanding)</option>
                    <option value="quirky">Quirky (Fun & playful)</option>
                    <option value="direct">Direct (No-nonsense & fast)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Greeting Message
                  </label>
                  <textarea
                    name="greeting"
                    value={formData.greeting}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  />
                  <p className="mt-2 text-xs text-gray-500">First message the user sees when they open the chat.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fallback Message
                  </label>
                  <textarea
                    name="fallback"
                    value={formData.fallback}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  />
                  <p className="mt-2 text-xs text-gray-500">What the bot says when it doesn't know the answer.</p>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Widget Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      name="widget_color"
                      value={formData.widget_color}
                      onChange={handleChange}
                      className="w-14 h-14 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      name="widget_color"
                      value={formData.widget_color}
                      onChange={handleChange}
                      className="flex-1 bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Widget Position
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["bottom-right", "bottom-left", "top-right", "top-left", "center-right", "center-left"].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setFormData({ ...formData, widget_position: pos })}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-xs font-medium ${
                          formData.widget_position === pos
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                            : "border-gray-700 bg-[#0F1115] text-gray-400 hover:border-gray-600 hover:text-gray-300"
                        }`}
                      >
                        <div className="w-8 h-6 rounded bg-gray-800 border border-gray-700 relative overflow-hidden">
                          <div 
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: formData.widget_position === pos ? formData.widget_color : '#9CA3AF',
                              top: pos.includes('top') ? '2px' : pos.includes('bottom') ? 'auto' : '50%',
                              bottom: pos.includes('bottom') ? '2px' : 'auto',
                              left: pos.includes('left') ? '2px' : pos.includes('right') ? 'auto' : '2px',
                              right: pos.includes('right') ? '2px' : 'auto',
                              transform: pos.includes('center') ? 'translateY(-50%)' : 'none'
                            }}
                          />
                        </div>
                        {pos.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview snippet */}
                <div className="mt-8">
                  <span className="text-sm font-medium text-gray-300 block mb-2">Live Preview</span>
                  <div className="relative w-full h-48 bg-[#0F1115] rounded-xl border border-gray-800 overflow-hidden shadow-inner">
                    {/* Mock Website Content */}
                    <div className="absolute inset-0 p-4 opacity-20 pointer-events-none">
                      <div className="w-1/3 h-4 bg-gray-600 rounded mb-4"></div>
                      <div className="w-full h-2 bg-gray-600 rounded mb-2"></div>
                      <div className="w-5/6 h-2 bg-gray-600 rounded mb-2"></div>
                      <div className="w-4/6 h-2 bg-gray-600 rounded mb-6"></div>
                      <div className="w-1/4 h-24 bg-gray-600 rounded"></div>
                    </div>
                    
                    {/* Floating Widget */}
                    <motion.div
                      layout
                      className="absolute shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      style={{ 
                        backgroundColor: formData.widget_color,
                        width: '48px',
                        height: '48px',
                        borderRadius: '24px',
                        top: formData.widget_position.includes('top') ? '16px' : formData.widget_position.includes('bottom') ? 'auto' : '50%',
                        bottom: formData.widget_position.includes('bottom') ? '16px' : 'auto',
                        left: formData.widget_position.includes('left') ? '16px' : formData.widget_position.includes('right') ? 'auto' : '16px',
                        right: formData.widget_position.includes('right') ? '16px' : 'auto',
                        marginTop: formData.widget_position.includes('center') ? '-24px' : '0'
                      }}
                    >
                      <FaRegCommentDots className="text-white w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="w-4 h-4" /> Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all transform active:scale-95"
            >
              Continue <FaArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white rounded-lg text-sm font-medium transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Complete Setup <FaCheck className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
