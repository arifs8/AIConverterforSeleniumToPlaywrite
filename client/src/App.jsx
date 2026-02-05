import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [sourceCode, setSourceCode] = useState('')
  const [result, setResult] = useState({ code: '', file: '', path: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConvert = async () => {
    if (!sourceCode.trim()) return
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/convert', {
        sourceCode,
        testFramework: 'TestNG',
        targetLanguage: 'TypeScript'
      })
      setResult({
        code: response.data.convertedCode,
        file: response.data.fileName,
        path: response.data.outputPath
      })
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.code)
  }

  return (
    <div className="container">
      <header>
        <span className="logo">Antigravity AI</span>
        <h1>Selenium to Playwright by Arif</h1>
        <p>Intelligent Automation Migration Engine v1.0.0</p>
      </header>

      <main className="main-content">
        <div className="editor-container">
          {/* Input Section */}
          <div className="editor-section glass">
            <div className="section-header">
              <label>
                <span>📥</span> Selenium Java Source
              </label>
              <span className="badge">TESTNG</span>
            </div>

            <div className="code-area">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste your Selenium Java code here (e.g. @Test public void myTest()...)"
                spellCheck="false"
              />
            </div>

            <div className="footer-actions">
              <button
                className="convert-btn"
                onClick={handleConvert}
                disabled={loading || !sourceCode.trim()}
              >
                {loading ? <div className="loader"></div> : <span>Translate Logic 🚀</span>}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="result-section glass">
            <div className="section-header">
              <label>
                <span>📤</span> Playwright TypeScript
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {result.code && (
                  <button className="icon-btn" onClick={copyToClipboard} title="Copy Code">
                    📋
                  </button>
                )}
                <span className="badge modern">MODERN</span>
              </div>
            </div>

            <div className="code-area">
              {result.file && (
                <div className="metadata">
                  <div className="meta-item">
                    <strong>📄 Target:</strong> <code>{result.file}</code>
                  </div>
                  <div className="meta-item">
                    <strong>📍 Location:</strong> <code>{result.path}</code>
                  </div>
                </div>
              )}

              <pre>
                <code>{result.code || '// Converted code will appear here...'}</code>
              </pre>

              {error && (
                <div style={{ padding: '1rem', color: '#f87171', background: 'rgba(248, 113, 113, 0.1)', margin: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="model-info">
          Powered by <strong>Ollama</strong> <span>•</span> <code>tinyllama:latest</code>
        </div>
        <div className="copyright">
          &copy; 2026 Antigravity Systems
        </div>
      </footer>
    </div>
  )
}

export default App
