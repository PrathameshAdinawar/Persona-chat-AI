export default function PersonaToggle({ persona, setPersona }) {
  const personas = [
    { 
      id: "hitesh", 
      name: "Hitesh", 
      gradient: "from-orange-400 to-red-500",
      shadow: "shadow-orange-500/25",
      ring: "ring-orange-400/30"
    },
    { 
      id: "piyush", 
      name: "Piyush", 
      gradient: "from-green-400 to-blue-500",
      shadow: "shadow-blue-500/25",
      ring: "ring-blue-400/30"
    },
  ];

  return (
    <div className="flex rounded-2xl p-1.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg border border-white/40 dark:border-gray-700/40">
      {personas.map((p) => {
        const active = persona === p.id;
        return (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className={[
              "px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform",
              active
                ? `bg-gradient-to-r ${p.gradient} text-white shadow-xl ${p.shadow} scale-105 ${p.ring} ring-2`
                : "text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md hover:scale-105",
            ].join(" ")}
            aria-pressed={active}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
