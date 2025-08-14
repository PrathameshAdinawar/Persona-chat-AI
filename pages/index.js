import Head from "next/head";
import { useState } from "react";
import PersonaToggle from "../components/PersonaToggle";
import ChatWindow from "../components/ChatWindow";
import GlassCard from "../components/GlassCard";
import Image from 'next/image';


export default function Home() {
  const [persona, setPersona] = useState("hitesh");

  const handlePersonaChange = (p) => {
    setPersona(p);
  };

  return (
    <>
      <Head>
        <title>Persona Chat AI – Hitesh & Piyush</title>
        <meta
          name="description"
          content="Chat with AI personas styled after Hitesh Choudhary and Piyush Garg."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
             <div className="flex items-center gap-4">
            {/* Logo with Next.js Image component */}
           <Image 
        src="../Logo/logo.png" 
        alt="Persona Chat AI Logo" 
        width={40} 
        height={40} 
        className="rounded-xl"
      />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Persona Chat AI
            </h1>
          </div>
            <PersonaToggle persona={persona} setPersona={handlePersonaChange} />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <GlassCard>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl text-white font-bold text-lg flex items-center justify-center shadow-lg ${
                    persona === "hitesh"
                      ? "bg-gradient-to-br from-orange-400 to-red-500"
                      : "bg-gradient-to-br from-green-400 to-blue-500"
                  }`}
                >
                  {persona === "hitesh" ? "HC" : "PG"}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    {persona === "hitesh"
                      ? "Hitesh Choudhary"
                      : "Piyush Garg"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {persona === "hitesh"
                      ? "Chai aur Code"
                      : "Thapa Technical"}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {persona === "hitesh"
                  ? "Energetic coding mentor mixing Hindi-English with practical tutorials, chai references, and motivational teaching style."
                  : "Clear, structured educator focused on hands-on projects, clean code practices, and step-by-step explanations."}
              </p>
              <div className="flex flex-wrap gap-2">
                {(persona === "hitesh"
                  ? [
                      {
                        label: "Hinglish",
                        color:
                          "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
                      },
                      {
                        label: "Motivational",
                        color:
                          "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
                      },
                      {
                        label: "Practical",
                        color:
                          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700",
                      },
                    ]
                  : [
                      {
                        label: "Structured",
                        color:
                          "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
                      },
                      {
                        label: "Projects",
                        color:
                          "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
                      },
                      {
                        label: "Clean Code",
                        color:
                          "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
                      },
                    ]
                ).map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Session Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Model
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Gemini 2.5 Flash
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                    Online
                  </span>
                </div>
              </div>
            </GlassCard>
          </aside>

          <section className="lg:col-span-8 xl:col-span-9 h-[75vh]">
            <GlassCard className="h-full flex flex-col overflow-hidden">
              <ChatWindow persona={persona} />
            </GlassCard>
          </section>
        </main>

        <footer className="border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl mt-16 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Persona Chat AI. Built with Next.js & Tailwind CSS & Gemini AI.
          </div>
        </footer>
      </div>
    </>
  );
}
