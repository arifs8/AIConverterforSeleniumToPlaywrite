import re
import sys

def post_process(code):
    # 1. Remove common prefixes that LLMs might add
    prefixes_to_remove = [
        "### PLAYWRIGHT TYPESCRIPT OUTPUT:",
        "Here is the converted code:",
        "Converted code:",
        "Playwright TypeScript:",
        "```typescript",
        "```javascript",
        "```ts",
        "```js",
        "```"
    ]
    
    for prefix in prefixes_to_remove:
        # Case insensitive remove at the start
        if code.lower().startswith(prefix.lower()):
            code = code[len(prefix):].strip()
            
    # Remove markdown blocks if they remain
    code = re.sub(r'```(?:typescript|javascript|ts|js)?\n', '', code)
    code = code.replace('```', '')

    # 2. Fix common LLM "hallucinations" or legacy syntax
    # browser.url -> page.goto
    code = code.replace('browser.url(', 'page.goto(')
    code = code.replace('driver.get(', 'page.goto(')
    
    # driver.findElement(By.id("...")) -> page.locator("#...")
    code = re.sub(r'driver\.findElement\(By\.id\("([^"]+)"\)\)', r'page.locator("#\1")', code)
    code = re.sub(r'driver\.findElement\(By\.name\("([^"]+)"\)\)', r'page.locator("[name=\1]")', code)
    
    # 3. Ensure modern Playwright imports
    if 'from \'@playwright/test\'' not in code and 'from "@playwright/test"' not in code:
        if 'import { test, expect }' not in code:
            code = "import { test, expect } from '@playwright/test';\n\n" + code

    # 4. Final trim
    return code.strip()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_code = sys.argv[1]
        print(post_process(input_code))
    else:
        # Read from stdin if no arg provided
        try:
            input_code = sys.stdin.read()
            print(post_process(input_code))
        except Exception as e:
            # Fallback if stdin fails
            pass
