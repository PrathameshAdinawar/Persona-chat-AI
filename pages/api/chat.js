// pages/api/chat.js
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { persona, messages } = req.body;
  if (!persona || !Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ message: "Missing persona or messages" });

  try {
    // Load persona rules
    const personaDir = path.join(process.cwd(), "data", "persona", persona);
    const personaRules = fs.readFileSync(
      path.join(personaDir, "persona_rules.md"),
      "utf-8"
    );
    const styleSnippets = fs
      .readFileSync(path.join(personaDir, "style_snippets.txt"), "utf-8")
      .slice(0, 1500);

    // Build our "instructions" — we’ll prepend this
    const systemPrompt = `
You are an AI assistant styled after ${persona}.
Follow these rules:
${personaRules}

Tone and style examples:
${styleSnippets}

- Greet warmly ONLY on the very first reply.
- Do NOT repeat the greeting in later replies.
- Stay conversational and follow the persona.
`.trim();

    // Map messages, making sure role is only "user" or "model"
    const conversation = messages.map((msg, idx) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Prepend the system prompt to the very first user turn
    conversation[0] = {
      role: "user",
      parts: [{ text: `${systemPrompt}\n\n${conversation[0].parts[0].text}` }],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
    });

    const replyText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a reply.";

    res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
