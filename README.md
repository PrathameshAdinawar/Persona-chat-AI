# Persona Chat AI

A modern, responsive AI chat application featuring authentic personas inspired by top tech educators. Talk to AI versions of Hitesh Choudhary and Piyush Garg, each with distinct communication styles, tone, and teaching approaches — in smooth Hinglish and English.

## ✨ Features
- Persona-based conversations (Hitesh & Piyush) with custom rules and voice.
- Conversation memory with non-repetitive greetings.
- Sleek shadcn-inspired UI with glassmorphism and smooth animations.
- Responsive, fast, and production-ready.
- Deployed on Vercel with serverless API routes.

## 🧠 Tech Stack
- Frontend: Next.js, Tailwind CSS, Framer Motion, React Markdown
- Backend: Next.js API Routes, Google Gemini 2.5 Flash
- Design: shadcn/ui-inspired components, gradients, and glassmorphism
- Deployment: Vercel

## 🗂️ Project Structure
```
pages/
  api/
    chat.js            # Serverless endpoint calling Gemini API
components/
  ChatWindow.jsx
  MessageBubble.jsx
  Button.jsx
  GlassCard.jsx
  PersonaToggle.jsx
data/
  persona/
    hitesh/
      persona_rules.md
      style_snippets.txt
    piyush/
      persona_rules.md
      style_snippets.txt
public/
  logo/
    logo.png           # App logo (used via /logo/logo.png)
```

## 🚀 Quick Start (Clone & Run)

```bash
# 1) Clone the repository
git clone https://github.com/your-username/persona-chat-ai.git
cd persona-chat-ai

# 2) Install dependencies
npm install

# 3) Configure environment variables
# Create a .env.local file in the project root with:
# GOOGLE_API_KEY=your_gemini_api_key

# 4) Start the development server
npm run dev

# 5) Open the app
# Visit http://localhost:3000
```

## 🔐 Environment Variables
Create a `.env.local` file in the project root:
```
GOOGLE_API_KEY=your_gemini_api_key
```
Tip: The free tier has strict limits (low RPM & daily caps). For production reliability, enable billing to increase limits.

## 🧩 Personas
- Hitesh Choudhary: Energetic, motivational Hinglish tone, practical coding approach.
- Piyush Garg: Calm, structured Hinglish tone, project-driven learning, clear explanations.

Each persona is configurable:
- data/persona//persona_rules.md  
- data/persona//style_snippets.txt

## 🖼️ UI/UX Highlights
- shadcn-style components and gradients.
- Glassmorphism cards with backdrop blur.
- Animated chat bubbles and transitions (Framer Motion).
- Dark mode-friendly palette.
- Optimized images via Next.js Image.

## 📦 Deploy to Vercel
1) Push your code to GitHub.  
2) Import the repo on Vercel.  
3) Add the environment variable in Vercel → Project Settings → Environment Variables:
```
GOOGLE_API_KEY=your_gemini_api_key
```
4) Place your logo at `public/logo/logo.png
` and reference it with:
```
<Image src="/logo/logo.png" alt="Logo" width={40} height={40} />
```
5) Redeploy after any changes to environment variables.

## 🛡️ Error Handling
- Graceful messages for rate limits and API unavailability.
- Structured logging in the API route for diagnostics.
- Fallback replies when candidates are empty.

## 🗣️ Usage Tips
- Always send the entire messages array to the API to preserve memory.
- Avoid repeated greetings by keeping the rule in persona instructions.
- Keep prompts concise and contextual for best results.

## 🧰 Common Commands
```bash
# Lint
npm run lint

# Build for production
npm run build

# Start production server (after build)
npm start
```

## 🤝 Contributing
PRs and suggestions are welcome! Improve personas, UI, performance, or integrations.

## 📄 License
MIT — use, modify, and build freely.

—

Built with ❤️ to make AI conversations feel more human, helpful, and personal.
