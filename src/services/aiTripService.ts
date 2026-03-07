// Use the dynamically deployed Firebase Cloud Function URL.
// IMPORTANT: Replace YOUR_PROJECT with the actual project ID once deployed if hardcoding, 
// or optimally use relative paths if hosted together, but per requirements we use the absolute URL layout.
const FIREBASE_FUNCTION_URL = "https://us-central1-ai-trip-planner-e5998.cloudfunctions.net/generateTrip";

export async function generateTrip(destination: string, days: string, budget: string): Promise<string> {
  try {
    const response = await fetch(FIREBASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination,
        days,
        budget
      }),
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error("The AI model is currently cold-starting. This usually takes about 20 seconds. Please try again shortly.");
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // The Firebase function returns { itinerary: "..." }
    if (data.itinerary) {
      return data.itinerary;
    }
    
    throw new Error("Failed to parse the generated itinerary from the server response.");
  } catch (error) {
    console.error("Firebase Proxy Request Error:", error);
    throw error;
  }
}
