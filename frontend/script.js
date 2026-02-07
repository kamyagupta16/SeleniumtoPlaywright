const API_BASE = 'http://localhost:3001/api';

const els = {
    sourceCode: document.getElementById('source-code'),
    targetCode: document.getElementById('target-code'),
    convertBtn: document.getElementById('convert-btn'),
    saveBtn: document.getElementById('save-btn'),
    copyBtn: document.getElementById('copy-btn'),
    loader: document.getElementById('loader'),
    toast: document.getElementById('toast'),
    overlay: document.getElementById('target-overlay')
};

// --- API Calls ---

async function convertCode(source) {
    try {
        const res = await fetch(`${API_BASE}/convert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source_code: source })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Conversion failed');

        return data.converted_code;
    } catch (err) {
        showToast(`Error: ${err.message}`, 'error');
        console.error(err);
        return null;
    }
}

async function saveCode(code, filename) {
    try {
        const res = await fetch(`${API_BASE}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, filename })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Save failed');

        return data.path;
    } catch (err) {
        showToast(`Error: ${err.message}`, 'error');
        return null;
    }
}

// --- UI Logic ---

function showToast(msg, type = 'info') {
    els.toast.textContent = msg;
    els.toast.style.borderColor = type === 'error' ? 'var(--error-color)' : 'var(--success-color)';
    els.toast.classList.remove('hidden');
    setTimeout(() => {
        els.toast.classList.add('hidden');
    }, 3000);
}

function clearSource() {
    els.sourceCode.value = '';
    els.sourceCode.focus();
}

els.convertBtn.addEventListener('click', async () => {
    const source = els.sourceCode.value.trim();
    if (!source) {
        showToast('Please enter Selenium code first', 'error');
        return;
    }

    // UI Loading State
    els.convertBtn.disabled = true;
    els.loader.classList.remove('hidden');
    els.targetCode.value = ''; // Clear previous output
    els.overlay.classList.remove('hidden'); // Show overlay on target

    const result = await convertCode(source);

    // Reset UI
    els.convertBtn.disabled = false;
    els.loader.classList.add('hidden');
    els.overlay.classList.add('hidden');

    if (result) {
        els.targetCode.value = result;
        showToast('Conversion Successful!', 'success');
    }
});

els.saveBtn.addEventListener('click', async () => {
    const code = els.targetCode.value.trim();
    if (!code) {
        showToast('Nothing to save!', 'error');
        return;
    }

    const filename = prompt('Enter filename (e.g., login.spec.ts):', 'converted.spec.ts');
    if (!filename) return;

    const path = await saveCode(code, filename);
    if (path) {
        showToast(`Saved to: ${path}`, 'success');
    }
});

els.copyBtn.addEventListener('click', () => {
    const code = els.targetCode.value;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
        showToast('Copied to clipboard!', 'success');
    });
});
