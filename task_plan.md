# Task Plan
## Phase 0: Initialization (Mandatory)
- [x] Initialize Project Memory (task_plan.md, findings.md, progress.md, gemini.md)
- [x] Halt Execution until Discovery Questions are answered

## Phase 1: B - Blueprint (Vision & Logic)
- [x] Discovery: Ask the 5 questions
- [x] Data-First Rule: Define JSON Data Schema in gemini.md
- [x] Research: Best prompts for converting Selenium (Java) to Playwright (TS)

## Phase 2: L - Link (Connectivity)
- [x] Pivot: Switched to Python (Flask) due to missing Node.js
- [x] Connectivity: Verified Ollama (`codellama`) is reachable
- [x] Dependencies: Installed `flask`, `flask-cors`

## Phase 3: A - Architect (The 3-Layer Build)
- [ ] **Layer 1: Architecture**
    - [ ] Create `backend/app.py` (Flask Server)
        - [ ] Serve Static Frontend
        - [ ] API: `/api/convert` (Calls Ollama)
        - [ ] API: `/api/save` (Writes to disk)
- [ ] **Layer 2: Frontend (UI/UX)**
    - [ ] Create `frontend/index.html` (Structure)
    - [ ] Create `frontend/style.css` (Premium Design)
    - [ ] Create `frontend/script.js` (Logic & API calls)
- [ ] **Layer 3: Tools/Logic**
    - [ ] Implement System Prompt for "Selenium Java -> Playwright TS" conversion in the backend logic.

## Phase 4: S - Stylize (Refinement & UI)
- [ ] UI: Polish the "Premium" look (Glassmorphism, Animations)
- [ ] Test: End-to-end conversion test
- [ ] Feedback: User review
