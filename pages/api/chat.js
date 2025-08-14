import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({});

export default async function handler(req, res) {
  console.log("API called at:", new Date().toISOString());
  console.log("Request body:", JSON.stringify(req.body, null, 2));

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { persona, messages } = req.body;
  if (!persona || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: "Missing persona or messages" });
  }

  try {
    // Load persona data files
    const personaDir = path.join(process.cwd(), "data", "persona", persona);
    const personaRules = fs.readFileSync(
      path.join(personaDir, "persona_rules.md"),
      "utf-8"
    );
    const styleSnippets = fs
      .readFileSync(path.join(personaDir, "style_snippets.txt"), "utf-8")
      .slice(0, 1500);

    // System prompt with greeting rule
    const systemPrompt = `
You are an AI assistant styled after ${persona}.
Follow these persona rules:
${personaRules}

Tone and style examples:
${styleSnippets}

- Greet warmly ONLY on the very first reply.
- Do NOT repeat the greeting in later replies.
- Stay conversational and follow the persona.
`.trim();

    // Map messages so roles are valid for Gemini
    // Gemini expects roles 'user' or 'model' (model = assistant)
    const conversation = messages.map((msg, idx) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Prepend system prompt to first user message
    conversation[0] = {
      role: "user",
      parts: [{ text: `${systemPrompt}\n\n${conversation[0].parts[0].text}` }],
    };

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: conversation,
    });

    console.log("Gemini response received:", !!response);
    console.log("Candidates length:", response?.candidates?.length);

    const replyText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response?.candidates?.[0]?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a reply.";

    res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error("Full error details:", {
      message: error.message,
      status: error.status,
      code: error.code,
      stack: error.stack,
    });

    if (error.status === 429) {
      return res.status(429).json({
        reply: "Rate limit exceeded. Please wait a moment and try again.",
      });
    }

    if (error.status === 500 || error.status === 503) {
      return res.status(500).json({
        reply: "Gemini API is temporarily unavailable. Please try again in a few minutes.",
      });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}
