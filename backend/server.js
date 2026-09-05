const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const multer = require("multer");

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const upload = multer({ 
  storage: multer.memoryStorage() 
});
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});
app.post("/api/analyze", upload.single("wireframe"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No wireframe image uploaded",
      });
    }

    const base64Image = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          text: `Analyze this wireframe image and identify the UI components.
Return ONLY valid JSON in this format:
{
  "components": [
    {
      "type": "button",
      "text": "Login"
    }
  ]
}
Do not add markdown or explanations.`,
        },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: base64Image,
          },
        },
      ],
    });

    const text = response.text;

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        components: [],
        rawResponse: text,
      };
    }

    res.json(result);
  } catch (error) {
    console.error("ANALYZE ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "AI Wireframe Backend is running successfully",
  });
});
app.get("/api/models", async (req, res) => {
  try {
    const models = await ai.models.list();

    const result = [];

    for await (const model of models) {
      result.push({
        name: model.name,
        methods: model.supportedActions,
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      result: response.text,
    });
  } catch (error) {
    console.error("GEMINI ERROR:",error);
    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});