import requests
import json

def test_ollama_conversion():
    url = "http://localhost:11434/api/generate"
    model = "tinyllama:latest"
    
    java_code = """
    @Test
    public void testTitle() {
        driver.get("https://google.com");
        Assert.assertEquals(driver.getTitle(), "Google");
    }
    """
    
    prompt = f"Convert this Selenium Java code to Playwright TypeScript. Return ONLY the code:\n{java_code}"
    
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    
    try:
        response = requests.post(url, json=payload, timeout=60)
        if response.status_code != 200:
            print(f"Error Body: {response.text}")
        response.raise_for_status()
        result = response.json()
        print("SUCCESS: Ollama Link Verified!")
        print("--- Converted Code ---")
        print(result.get('response'))
        return True
    except Exception as e:
        print(f"FAILED: Ollama Link Failed: {e}")
        return False

if __name__ == "__main__":
    test_ollama_conversion()
