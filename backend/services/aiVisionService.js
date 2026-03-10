const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'mock-key-for-now' });

const detectHazardWithAI = async (imagePath, description) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY not found in .env. Falling back to mock AI data.");
            return mockHazardDetection(description);
        }

        const absoluteImagePath = path.resolve(imagePath);

        // Read file as base64
        const imageBuffer = fs.readFileSync(absoluteImagePath);
        const base64Data = imageBuffer.toString("base64");
        // We'll guess jpeg natively, usually fine for Gemini API base64 buffers
        const mimeType = "image/jpeg";

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType
            }
        };

        const prompt = `Analyze the image and the following user description: "${description}".
Detect if it contains an ocean hazard. You MUST classify it as strictly one of these types:
- tsunami
- oil_spill
- storm
- debris
- flooding
- none

Return ONLY a valid JSON object in this exact format, with no markdown blocks formatting:
{
  "hazardType": "name of hazard",
  "confidence": number between 0 and 100,
  "explanation": "short reasoning for your classification"
}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [prompt, imagePart]
        });

        // Clean JSON formatting
        const responseText = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(responseText);

        if (parsed.confidence < 20) {
            parsed.hazardType = "uncertain";
        }

        return parsed;

    } catch (err) {
        console.error("AI Validation Error:", err);
        // Fallback mechanic
        return mockHazardDetection(description);
    }
};

const mockHazardDetection = (description) => {
    const descLowerCase = description.toLowerCase();
    let hazardType = 'Unknown';
    let confidence = 50;

    if (descLowerCase.includes('wave') || descLowerCase.includes('storm')) {
        hazardType = 'Storm Waves';
        confidence = 85;
    } else if (descLowerCase.includes('oil')) {
        hazardType = 'Oil Spill';
        confidence = 95;
    } else if (descLowerCase.includes('debris') || descLowerCase.includes('pollution')) {
        hazardType = 'Debris';
        confidence = 80;
    } else if (descLowerCase.includes('flood')) {
        hazardType = 'Flooding';
        confidence = 90;
    }

    return { hazardType, confidence };
}

module.exports = { detectHazardWithAI };
