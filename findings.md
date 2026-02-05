## Discovery Answers (2026-02-05)
- **North Star**: Selenium Java to Playwright JS/TS converter.
- **Integrations**: TestNG Selenium Java -> Playwright JS/TS.
- **Source of Truth**: UI input (User enters Selenium/Java code).
- **Delivery Payload**: Files saved in a new directory and displayed in the UI.
- **Behavioral Rules**: Prioritize readability and modern Playwright patterns over strict 1:1 mapping.

## Selenium To Playwright Mapping
| Selenium Java (TestNG) | Playwright (TS/JS) |
| :--- | :--- |
| `driver.get(url)` | `await page.goto(url)` |
| `driver.findElement(By.id("id"))` | `page.locator("#id")` |
| `driver.findElement(By.name("name"))` | `page.locator("[name='name']")` |
| `element.sendKeys("text")` | `await element.fill("text")` |
| `element.click()` | `await element.click()` |
| `Assert.assertEquals(a, b)` | `expect(a).toBe(b)` |
| `@Test` | `test('name', async ({ page }) => { ... })` |
| `@BeforeMethod` | `test.beforeEach(async ({ page }) => { ... })` |
| `@AfterMethod` | `test.afterEach(async ({ page }) => { ... })` |

## Technical Constraints (Updated)
- **Stack**: Node.js/Express (Backend), React/Vite (Frontend - Premium Glassmorphism), Ollama (LLM Engine).
- **Core Strategy**: LLM handles the complex structural translation, while a deterministic post-processor (Layer 3) ensures locators and syntax follow Playwright best practices.
