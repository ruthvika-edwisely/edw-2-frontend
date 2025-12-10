import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export async function getCodingAssistantResponse(userMessage, problemContext = null) {
  try {
    const systemPrompt = `You are an expert coding assistant helping users solve programming problems. 
You provide helpful hints, explain concepts, debug code, and guide users toward solutions.
Be concise but thorough. Use code examples when helpful.
Format your responses with markdown when appropriate.
${problemContext ? `\nCurrent problem context:\n${problemContext}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}

export async function analyzeCode(code, language, problemDescription = "") {
  try {
    const prompt = `Analyze this ${language} code and provide feedback on:
1. Correctness - does it solve the problem?
2. Time complexity
3. Space complexity
4. Potential improvements

Problem: ${problemDescription}

Code:
\`\`\`${language}
${code}
\`\`\``;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Unable to analyze the code.";
  } catch (error) {
    console.error("Code analysis error:", error);
    throw new Error(`Failed to analyze code: ${error.message}`);
  }
}

export async function getHint(problemDescription, currentCode = "", language = "python") {
  try {
    const prompt = `The user is working on this problem:
${problemDescription}

${currentCode ? `Their current code:\n\`\`\`${language}\n${currentCode}\n\`\`\`` : 'They haven\'t written any code yet.'}

Provide a helpful hint without giving away the complete solution. Guide them toward the right approach.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Unable to generate a hint.";
  } catch (error) {
    console.error("Hint generation error:", error);
    throw new Error(`Failed to generate hint: ${error.message}`);
  }
}
