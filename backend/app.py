import os
import json
import urllib.request
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend')
CORS(app)

# Ensure output directory exists
OUTPUT_DIR = os.path.join(os.getcwd(), 'output')
os.makedirs(OUTPUT_DIR, exist_ok=True)

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "codellama"

CONVERSION_SYSTEM_PROMPT = """
You are an expert Test Automation Engineer. Your task is to convert Selenium Java (TestNG) code into Playwright TypeScript/JavaScript code.

Follow these rules:
1. **Readability First**: Do not translate line-by-line. Understand the intent of the test and rewrite it using Playwright best practices (e.g., auto-waiting, explicit locators).
2. **Structure**: 
   - Convert `@Test` to `test('test name', async ({ page }) => { ... })`.
   - Convert `@BeforeMethod` to `test.beforeEach(async ({ page }) => { ... })`.
   - Convert `driver.findElement(By.id("foo")).click()` to `await page.click('#foo')` or `await page.locator('#foo').click()`.
3. **Assertions**: Convert `Assert.assertEquals(actual, expected)` to `expect(actual).toBe(expected)`.
4. **Output**: Return ONLY the converted code. Do not include markdown blocks (```typescript) or explanations unless asked. just clean code.
"""

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/convert', methods=['POST'])
def convert_code():
    data = request.json
    source_code = data.get('source_code', '')
    
    if not source_code:
        return jsonify({"error": "No source code provided"}), 400

    # improved prompt construction
    full_prompt = f"{CONVERSION_SYSTEM_PROMPT}\n\nHere is the Selenium Java code to convert:\n\n{source_code}\n\nConverted Playwright Code:"

    payload = {
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": False
    }

    try:
        req = urllib.request.Request(
            OLLAMA_API_URL,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            converted_code = result.get('response', '')
            
            # Simple cleanup if Ollama includes markdown fences
            converted_code = converted_code.replace("```typescript", "").replace("```javascript", "").replace("```", "").strip()
            
            return jsonify({"converted_code": converted_code})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/save', methods=['POST'])
def save_code():
    data = request.json
    code = data.get('code', '')
    filename = data.get('filename', 'converted_test.spec.ts')

    if not code:
        return jsonify({"error": "No code to save"}), 400
    
    # Sanitize filename
    filename = os.path.basename(filename)
    if not filename.endswith('.ts') and not filename.endswith('.js'):
        filename += '.ts'
        
    file_path = os.path.join(OUTPUT_DIR, filename)
    
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(code)
        return jsonify({"message": "File saved successfully", "path": file_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(f"Backend running on http://localhost:3001")
    app.run(port=3001, debug=True)
