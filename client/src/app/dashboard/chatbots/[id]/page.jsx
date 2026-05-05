"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaFileAlt, FaCode, FaCog, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Suspense } from "react";

function ChatbotDashboardContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const isCreated = searchParams.get("created") === "true";
  const chatbotId = params.id;

  const nextSteps = [
    {
      title: "Upload docs",
      description: "Add your knowledge base to train Aria",
      icon: <FaFileAlt className="w-8 h-8 mb-4 text-emerald-400" />,
      href: `/dashboard/chatbots/${chatbotId}/knowledge`,
      color: "from-emerald-500/10 to-emerald-500/5",
      border: "hover:border-emerald-500/50",
    },
    {
      title: "Get script tag",
      description: "Embed on your website in one line",
      icon: <FaCode className="w-8 h-8 mb-4 text-blue-400" />,
      href: `/dashboard/chatbots/${chatbotId}/integration`,
      color: "from-blue-500/10 to-blue-500/5",
      border: "hover:border-blue-500/50",
    },
    {
      title: "Edit settings",
      description: "Change appearance and personality",
      icon: <FaCog className="w-8 h-8 mb-4 text-purple-400" />,
      href: `/dashboard/chatbots/${chatbotId}/settings`,
      color: "from-purple-500/10 to-purple-500/5",
      border: "hover:border-purple-500/50",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <button 
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <FaArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {isCreated && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-12 flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
            <FaCheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Chatbot Created Successfully!</h1>
            <p className="text-emerald-200/70">
              Your chatbot is ready. Complete these next steps to get it live on your website.
            </p>
          </div>
        </motion.div>
      )}

      {!isCreated && (
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Chatbot Overview</h1>
          <p className="text-gray-400">Manage your chatbot settings, knowledge base, and integrations.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {nextSteps.map((step, index) => (
          <Link href={step.href} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`bg-gradient-to-br ${step.color} border border-gray-800 ${step.border} rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
            >
              <div className="transform transition-transform group-hover:scale-110 origin-left">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ChatbotDashboard() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500 animate-pulse">Loading dashboard...</div>}>
      <ChatbotDashboardContent />
    </Suspense>
  );
}
