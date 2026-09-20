const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const multer = require("multer");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Gemini AI configuration
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Image upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

/* =========================================================
   HOME ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.json({
    message: "AI Wireframe Backend is running successfully",
  });
});

/* =========================================================
   ANALYZE WIREFRAME
========================================================= */

app.post("/api/analyze", upload.single("wireframe"), async (req, res) => {
  try {
    console.log("Starting wireframe analysis...");

    // Check image
    if (!req.file) {
      return res.status(400).json({
        error: "No wireframe image uploaded",
      });
    }

    console.log("Image received:", req.file.originalname);

    // Convert image to Base64
    const base64Image = req.file.buffer.toString("base64");

    // Gemini prompt
    const prompt = `
Analyze the uploaded wireframe image carefully and convert it into an editable UI mockup.

Identify ALL visible UI components from the wireframe.

Possible component types are:

- heading
- text
- paragraph
- input
- dropdown
- button
- checkbox
- textarea
- image
- card
- navbar

Return ONLY valid JSON.
Do NOT return markdown.
Do NOT use code fences.
Do NOT add explanations.

Use exactly this JSON structure:

{
  "page": {
    "name": "Generated UI Mockup",
    "width": 1000,
    "height": 700
  },
  "components": [
    {
      "id": "unique-id",
      "type": "text",
      "text": "Name:",
      "x": 100,
      "y": 100,
      "width": 180,
      "height": 40,
      "bgColor": "#ffffff",
      "textColor": "#111827",
      "fontSize": 16,
      "placeholder": ""
    }
  ]
}

IMPORTANT LAYOUT RULES:

1. Carefully analyze the original wireframe before generating the JSON.

2. Preserve the relative position and order of the components from the wireframe.

3. Use a canvas size of 1000 x 700.

4. Use x and y coordinates to represent the actual position of every component.

5. Do not overlap components.

6. Keep all components inside the page boundaries whenever possible.

7. Keep related labels and input fields aligned.

8. Use consistent vertical spacing between form rows.

9. Input fields in the same form should normally have similar widths.

10. Dropdowns should have dimensions similar to nearby input fields.

11. Textareas should be taller than normal input fields.

12. Buttons should have appropriate width and height.

13. Keep the main heading centered when the wireframe shows a centered heading.

14. Keep labels consistently aligned.

15. Preserve the top-to-bottom order of the original wireframe.

16. Do not create components that are not visible in the wireframe.

17. Generate a unique ID for every component.

18. Use realistic width and height values.

19. Use the actual visible text from the wireframe whenever readable.

20. If text cannot be identified, use a suitable short placeholder.

21. Use "#ffffff" as the default background color for input fields.

22. Use "#111827" as the default text color.

23. Use font sizes between 14 and 32 depending on the component.

24. Make the generated layout clean and professional.

25. Make the final UI visually similar to the uploaded wireframe.

26. Include page information and components in the final JSON.

27. Make sure the JSON is syntactically valid.

Return ONLY the JSON object.
`;

    // Send image + prompt to Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: base64Image,
          },
        },
      ],
    });

    // Gemini response
    let text = response.text || "";

    console.log("Gemini response received.");

    // Remove accidental markdown code fences
    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parsing failed.");

      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        rawResponse: text,
      });
    }

    // Make sure page object exists
    if (!result.page) {
      result.page = {
        name: "Generated UI Mockup",
        width: 1000,
        height: 700,
      };
    }

    // Make sure components array exists
    if (!Array.isArray(result.components)) {
      result.components = [];
    }

    console.log(
      `Analysis completed successfully. Components found: ${result.components.length}`
    );

    // Send result to frontend
    res.json(result);

  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    res.status(500).json({
      error: error.message || "Failed to analyze wireframe",
    });
  }
});

/* =========================================================
   LIST GEMINI MODELS
========================================================= */

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
    console.error("MODELS ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* =========================================================
   TEXT GENERATION
========================================================= */

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      result: response.text,
    });

  } catch (error) {
    console.error("GEMINI ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});