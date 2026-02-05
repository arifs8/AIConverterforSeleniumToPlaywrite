const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/generate";
const DEFAULT_MODEL = "tinyllama:latest";

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

app.post('/api/convert', async (req, res) => {
    const { sourceCode, testFramework, targetLanguage, options } = req.body;

    if (!sourceCode) {
        return res.status(400).json({ error: "Source code is required" });
    }

    // Load SOP (Layer 1)
    let sop = "";
    try {
        sop = fs.readFileSync(path.join(__dirname, '../architecture/conversion_sop.md'), 'utf-8');
    } catch (e) {
        console.warn("SOP not found, proceeding without it.");
    }

    const prompt = `### INSTRUCTIONS:
Convert the provided Selenium Java code to Playwright TypeScript. 
- Use modern Playwright patterns (async/await).
- Use page.locator() instead of legacy selectors.
- Prioritize readability.
- Return ONLY the TypeScript code block. 
- NO explanations, NO Markdown backticks, NO prefix text.

### CONVERSION RULES:
1. @Test -> test('name', async ({ page }) => { ... })
2. driver.get(url) -> await page.goto(url)
3. element.sendKeys(text) -> await element.fill(text)
4. Assert.assertEquals -> expect(...).toBe(...)

### SOURCE CODE TO CONVERT:
${sourceCode}

### PLAYWRIGHT TYPESCRIPT OUTPUT:`;

    try {
        const startTime = Date.now();
        const response = await axios.post(OLLAMA_URL, {
            model: DEFAULT_MODEL,
            prompt: prompt,
            stream: false
        });

        let convertedCode = response.data.response;

        // Layer 3 Tool: Post-Processing
        try {
            const cleanedCode = execSync(`python ../tools/post_process_converter.py`, {
                input: convertedCode,
                encoding: 'utf-8',
                cwd: __dirname
            });
            convertedCode = cleanedCode;
        } catch (e) {
            console.error("Post-processing tool failed:", e.message);
        }

        // Delivery Payload: Save to output directory
        const outputDir = path.join(__dirname, '../output');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const fileName = (options && options.fileName) || `ConvertedTest_${Date.now()}.spec.ts`;
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, convertedCode);

        res.json({
            success: true,
            convertedCode,
            fileName,
            outputPath: filePath,
            metadata: {
                modelUsed: DEFAULT_MODEL,
                conversionTime: Date.now() - startTime
            }
        });
    } catch (error) {
        console.error("Conversion Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to connect to Ollama or process conversion."
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: "ok", message: "Converter Server is running" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
