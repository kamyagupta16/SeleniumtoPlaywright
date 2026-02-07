# Findings
This document tracks research, discoveries, and constraints throughout the project.

## Research
- [ ] LLM Prompts for Java -> TS conversion: Needs careful instructions to prefer `await page.locator()` instead of raw selectors if possible.
- [ ] TestNG Annotations:
  - `@Test` -> `test()`
  - `@BeforeMethod` -> `test.beforeEach()`
  - `@AfterMethod` -> `test.afterEach()`
  - `@DataProvider` -> Parameterized tests (requires careful handling).

## Constraints
- **Local Only**: All processing must happen locally (Ollama + Node/Python).
- **UI Requirement**: Must be web-based (Vite).
- **Readability**: The generated code should look like it was written in TS, not just translated Java line-by-line.

## Discoveries
- **Stack Decision**: Front-end (Vite/React) + Back-end (Node/Express).
- **Core Engine**: Local LLM (Ollama).
