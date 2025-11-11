
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

    const firstCandidate = response.candidates?.[0];

    if (!firstCandidate) {
      const blockReason = response.promptFeedback?.blockReason;
      if (blockReason) {
         throw new Error(`Request was blocked due to: ${blockReason}`);
      }
      throw new Error("The model did not return any content. Please try again.");
    }
    
    if (firstCandidate.finishReason && firstCandidate.finishReason !== 'STOP') {
      let userFriendlyMessage = `Generation failed. Reason: ${firstCandidate.finishReason}.`;
      switch(firstCandidate.finishReason) {
        case 'NO_IMAGE':
          userFriendlyMessage = "The model couldn't create an image based on your request. Please try a different or more descriptive prompt.";
          break;
        case 'SAFETY':
          userFriendlyMessage = "Your request was blocked for safety reasons. Please adjust your prompt and try again.";
          break;
        case 'RECITATION':
           userFriendlyMessage = "The response was blocked to prevent recitation from copyrighted sources. Please rephrase your request.";
           break;
      }
      throw new Error(userFriendlyMessage);
    }

    if (!firstCandidate.content?.parts) {
        throw new Error("The model returned an invalid response structure. This could be due to safety filters.");
    }

    const imagePart = firstCandidate.content.parts.find(part => part.inlineData);

    if (imagePart?.inlineData?.data) {
      return imagePart.inlineData.data;
    }

    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        throw error; // Re-throw the more specific error to be handled by the UI
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
}
