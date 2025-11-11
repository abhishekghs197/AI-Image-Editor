import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export async function editImageWithGemini(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  // Assume process.env.API_KEY is available
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    // Check for prompt feedback first, as it's a top-level indicator of an issue.
    const blockReason = response.promptFeedback?.blockReason;
    if (blockReason) {
      if (blockReason === 'SAFETY') {
        throw new Error("Your prompt was blocked for safety reasons. Please adjust your prompt and try again.");
      }
      throw new Error(`Your prompt couldn't be processed (reason: ${blockReason}). Please try rephrasing your request.`);
    }

    const firstCandidate = response.candidates?.[0];

    // If there are no candidates, something went wrong.
    if (!firstCandidate) {
      throw new Error("The model did not return any content. This might be due to a network issue or a very complex prompt. Please try again.");
    }
    
    // Check the finish reason for explicit failures.
    const finishReason = firstCandidate.finishReason;
    if (finishReason && finishReason !== 'STOP') {
      switch(finishReason) {
        case 'NO_IMAGE':
          throw new Error("The model couldn't create an image based on your request. Please try a different or more descriptive prompt.");
        case 'SAFETY':
          throw new Error("The generated image was blocked for safety reasons. Please adjust your prompt and try again.");
        case 'RECITATION':
           throw new Error("The response was blocked to prevent recitation from copyrighted sources. Please rephrase your request.");
        case 'MAX_TOKENS':
            throw new Error("The request was too long for the model to handle. Please try a shorter prompt.");
        default:
            throw new Error(`Generation failed for an unknown reason (${finishReason}). Please try again.`);
      }
    }

    // Now, validate the content of the successful candidate.
    const imagePart = firstCandidate.content?.parts?.find(part => part.inlineData);

    if (imagePart?.inlineData?.data) {
      return imagePart.inlineData.data;
    }

    // If we have a candidate with a 'STOP' reason but no image, it's a more subtle issue.
    // This is often a safety-related refusal to generate without an explicit safety block.
    throw new Error("The model processed the request but didn't return an image. This can happen with ambiguous or sensitive prompts. Please try being more specific.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        // Re-throw the specific, user-friendly error we created above.
        throw error; 
    }
    // Fallback for unexpected errors (e.g., network issues within the SDK).
    throw new Error("An unexpected error occurred. Please check your connection and try again.");
  }
}