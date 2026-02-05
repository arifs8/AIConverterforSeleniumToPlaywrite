# SOP: Selenium Java (TestNG) to Playwright (TS/JS) Conversion

## Overview
This SOP defines the deterministic rules for converting legacy Selenium TestNG code into modern Playwright scripts. We prioritize **async/await** patterns, **auto-waiting locators**, and **readability** over strict 1:1 mapping.

## 1. Annotation Mapping
| TestNG Annotation | Playwright Equivalent | Context |
| :--- | :--- | :--- |
| `@Test` | `test('name', async ({ page }) => { ... })` | Regular test case |
| `@BeforeMethod` | `test.beforeEach(async ({ page }) => { ... })` | Setup before each test |
| `@AfterMethod` | `test.afterEach(async ({ page }) => { ... })` | Teardown after each test |
| `@BeforeClass` | `test.beforeAll(async () => { ... })` | Setup once per file |
| `@AfterClass` | `test.afterAll(async () => { ... })` | Teardown once per file |
| `@DataProvider` | `test('name', async ({ page }) => { ... })` with loop | Use Playwright's data-driven patterns |

## 2. Locator Translation
Avoid legacy XPath where modern CSS or Playwright's built-in locators are available.

| Selenium Java | Playwright (Preferred) |
| :--- | :--- |
| `By.id("user")` | `page.locator('#user')` |
| `By.name("pass")` | `page.locator('[name="pass"]')` |
| `By.cssSelector(".btn")` | `page.locator('.btn')` |
| `By.xpath("//button")` | `page.locator('button')` (if simple) or `page.locator('xpath=//button')` |
| `By.linkText("Login")` | `page.getByRole('link', { name: 'Login' })` |

## 3. Action Translation
All actions MUST be awaited.

- **Navigation**: `driver.get(url)` -> `await page.goto(url)`
- **Input**: `element.sendKeys(text)` -> `await element.fill(text)`
- **Click**: `element.click()` -> `await element.click()`
- **Assertions**: `Assert.assertEquals(actual, expected)` -> `expect(actual).toBe(expected)`

## 4. Wait Strategies
Playwright has built-in auto-waiting.
- **Rule**: Remove `Thread.sleep()` entirely.
- **Rule**: Replace `WebDriverWait` with Playwright's `waitFor()` or rely on auto-waiting during actions (click/fill).

## 5. The "Readability First" Rule
- Use **Descriptive Test Names**: Extract the Java method name and convert it to a human-readable string.
- **Async Workflow**: Ensure every interaction with the `page` or `locator` is preceded by `await`.
- **Clean Imports**: Include only necessary Playwright modules: `import { test, expect } from '@playwright/test';`.

## 6. Post-Processing Requirements (Layer 3)
After LLM generation, a post-processor script must:
1. Wrap the code in a standard Playwright test structure if the LLM missed it.
2. Fix common LLM mistakes like using `browser.url()` (WebdriverIO syntax) instead of `page.goto()`.
3. Normalize quotes and indentation.
