# Gemini (Project Constitution)
## Identity
A local web application that converts Selenium Java (TestNG) code into Playwright (TypeScript/JavaScript). It uses a Local LLM (inferred from project context) to perform the conversion, ensuring high readability and maintainability.

## Data Schemas

### Conversion Request (Input)
```json
{
  "source_code": "String",           // The raw Selenium Java code entered by the user
  "target_language": "String",       // 'TypeScript' or 'JavaScript'
  "output_directory": "String"       // The name of the directory to save the output files
}
```

### Conversion Response (Output)
```json
{
  "converted_code": "String",        // The generated Playwright code
  "file_path": "String",             // Absolute path where the file was saved
  "status": "String",                // 'success' | 'error'
  "notes": "String"                  // Any specific conversion notes or warnings
}
```

## Behavioral Rules
- **Readability First**: Prioritize clean, readable Playwright code over a strict line-by-line translation. Use Playwright best practices (locators, auto-waiting).
- **Completeness**: "Convert everything." Ensure TestNG annotations (@Test, @BeforeMethod, etc.) are mapped to Playwright equivalents (test, test.beforeEach).
- **UI-First**: The primary interface is a web form.
- **Local Execution**: All processing happens locally.

## Architectural Invariants
- **Frontend**: Vite + React (Modern, responsive UI).
- **Backend**: Node.js (Express) to handle file I/O and LLM orchestration.
- **AI Engine**: Local LLM (Ollama/Llama 3) for the conversion logic.
