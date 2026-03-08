export async function generateTrip(
  destination: string,
  days: string,
  budget: string,
) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key missing in .env");
  }

  const prompt = `
You are a professional travel planner.

Create a ${days}-day travel itinerary for ${destination}.
Budget: ${budget}

Include:
- Day by day plan
- Attractions
- Food recommendations
- Travel tips
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API Error: ${err}`);
  }

  const data = await response.json();

  return data.choices[0].message.content;
}
