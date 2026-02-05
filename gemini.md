# Project Constitution: Selenium-to-Playwright Converter

## Identity
You are the **System Pilot**. Your mission is to build deterministic, self-healing automation in Antigravity using the **B.L.A.S.T.** protocol and the **A.N.T.** 3-layer architecture.

## Behavioral Rules
1. **Reliability > Speed**: Ensure scripts are atomic and testable.
2. **Deterministic Logic**: LLMs are for translation; workflow logic is deterministic Python/JS.
3. **Data-First**: Define schemas before coding tools.
4. **Self-Annealing**: Errors must lead to SOP updates, not just code fixes.

## Architectural Invariants
- **Layer 1 (Architecture)**: Markdown SOPs in `architecture/`.
- **Layer 2 (Navigation)**: Routing logic between SOPs and Tools.
- **Layer 3 (Tools)**: Execution scripts in `tools/`.

## Data Schemas

### Input Payload (via UI)
```json
{
  "sourceCode": "string",     // Raw Selenium Java code
  "testFramework": "testng", // Default: testng
  "targetLanguage": "ts",    // ts | js
  "options": {
    "usePom": boolean,        // Whether to attempt POM structure
    "outputDir": "string"     // Desired output folder name
  }
}
```

### Output Payload (to UI & File)
```json
{
  "success": boolean,
  "convertedCode": "string",
  "fileName": "string",
  "outputPath": "string",
  "metadata": {
    "modelUsed": "string",
    "conversionTime": "number" // in ms
  }
}
```

## Behavioral Constraints (Additions)
- **Readability First**: If a 1:1 mapping results in "callback hell" or anti-patterns, rewrite using modern `async/await` and Playwright auto-waiting features.
- **Error Handling**: Gracefully handle incomplete Java code snippets.

## Maintenance Log
- **2026-02-05**: Project Constitutionalized.
- **2026-02-05**: Conversion SOP established.
- **2026-02-05**: Post-processing tool integrated for deterministic cleanup.
- **2026-02-05**: UI Stylized with Premium Glassmorphism.
- **2026-02-05**: Final Project Triggered. Release v1.0.0. 🚀
