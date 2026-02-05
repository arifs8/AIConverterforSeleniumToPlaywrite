# ⚡ Selenium to Playwright Converter by Arif

An intelligent, AI-powered automation migration engine designed to translate legacy Selenium Java (TestNG) code into modern, high-performance Playwright TypeScript/JavaScript scripts.

![Project Banner](client/public/vite.svg) <!-- Placeholder for actual banner if available -->

## 🚀 Overview

The **SJP Converter** leverages the power of Local LLMs (Ollama) and a deterministic 3-layer architecture (B.L.A.S.T. Protocol) to ensure that your migration is not just a 1:1 code swap, but a modernization of your entire automation logic.

## ✨ Key Features

- **Local LLM Integration**: Uses **Ollama** for secure, private, and offline code translation (No data leaves your machine).
- **Glassmorphism Dashboard**: A premium, high-end web interface for side-by-side code comparison.
- **Deterministic Cleanup**: Specialized Python post-processors ensure that the AI output follows Playwright best practices (page.locator, async/await, auto-waiting).
- **TestNG Support**: Maps legacy annotations (`@Test`, `@BeforeMethod`, etc.) to modern Playwright hooks.
- **Automatic Delivery**: Converted scripts are automatically saved to your local file system.

## 🛠️ Technology Stack

- **Frontend**: Vite + React + Vanilla CSS (Glassmorphism)
- **Backend**: Node.js + Express
- **AI Engine**: Ollama (tinyllama)
- **Logic Layer**: Python (Post-processing)
- **Architecture**: B.L.A.S.T. (Blueprint, Link, Architect, Stylize, Trigger)

## 📦 Project Structure

```text
├── architecture/      # Layer 1: Conversion SOPs & Rules
├── client/            # Layer 4: Premium React Frontend
├── server/            # Layer 2: Express Backend Orchestration
├── tools/             # Layer 3: Deterministic Python Post-processors
├── output/            # Delivery Payload: Saved Playwright scripts
└── gemini.md          # Project Constitution & Governance
```

## 🚦 Getting Started

### Prerequisites

1. **Ollama**: [Download Ollama](https://ollama.com/) and pull the required model:
   ```powershell
   ollama pull tinyllama
   ```
2. **Node.js**: [v18+](https://nodejs.org/)
3. **Python**: [v3.10+](https://www.python.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arifs8/AIConverterforSeleniumToPlaywrite.git
   cd AIConverterforSeleniumToPlaywrite
   ```

2. Install Server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install Client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend**:
   ```powershell
   cd server
   npm start
   ```

2. **Start the Frontend**:
   ```powershell
   cd ../client
   npm run dev
   ```

3. Open your browser at **[http://localhost:5173](http://localhost:5173)**

## 📖 Usage

1. Paste your **Selenium Java (TestNG)** code into the left editor.
2. Click **Translate Logic 🚀**.
3. Review the **Playwright TypeScript** code in the right editor.
4. Copy the code or find the saved `.spec.ts` file in the `output/` directory.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
Created with ❤️ by **Arif** using the **Antigravity AI Framework**.
