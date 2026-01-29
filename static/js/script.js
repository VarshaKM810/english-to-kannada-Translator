// Get DOM elements
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const sourceLanguage = document.getElementById('source-language');
const targetLanguage = document.getElementById('target-language');
const charCount = document.getElementById('char-count');
const statusMessage = document.getElementById('status-message');

// Update character count
inputText.addEventListener('input', function() {
    charCount.textContent = this.value.length;
});

// Translate text
async function translateText() {
    const text = inputText.value.trim();
    
    if (!text) {
        showStatus('Please enter some text to translate.', 'error');
        return;
    }

    if (sourceLanguage.value === targetLanguage.value) {
        showStatus('Source and target languages must be different.', 'error');
        return;
    }

    showStatus('Translating...', 'loading');
    toggleButtonsDisabled(true);

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                source_language: sourceLanguage.value,
                target_language: targetLanguage.value
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            showStatus(data.error, 'error');
            outputText.value = '';
        } else {
            outputText.value = data.translated_text;
            showStatus('Translation successful!', 'success');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Translation failed. Please try again.', 'error');
        outputText.value = '';
    } finally {
        toggleButtonsDisabled(false);
    }
}

// Swap languages
function swapLanguages() {
    const temp = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = temp;

    // Swap text areas
    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;

    charCount.textContent = inputText.value.length;
}

// Clear text
function clearText() {
    inputText.value = '';
    outputText.value = '';
    charCount.textContent = '0';
    hideStatus();
    inputText.focus();
}

// Copy to clipboard
async function copyToClipboard() {
    if (!outputText.value) {
        showStatus('Nothing to copy!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(outputText.value);
        showStatus('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy:', err);
        showStatus('Failed to copy text.', 'error');
    }
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
}

// Hide status message
function hideStatus() {
    statusMessage.className = 'status-message';
}

// Toggle buttons disabled state
function toggleButtonsDisabled(disabled) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = disabled;
    });
}

// Allow Enter key to translate (Ctrl+Enter)
inputText.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        translateText();
    }
});

// Load supported languages on page load
document.addEventListener('DOMContentLoaded', function() {
    inputText.focus();
});
