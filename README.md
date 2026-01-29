# English to Kannada Translator

A simple and elegant web-based translator that converts English text to Kannada and other Indian languages using Flask and Google Translate API.

## Features

✨ **Key Features:**
- Translate English to Kannada and other Indian languages
- Support for Hindi, Telugu, Tamil, Malayalam, Marathi, and Gujarati
- Character count display (max 5000 characters)
- Copy translation to clipboard
- Swap languages functionality
- Responsive design for mobile and desktop
- Clean, modern user interface
- Real-time translation

## Project Structure

```
english-to-kannada-Translator/
├── app.py                  # Flask application and API routes
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html         # HTML template
├── static/
│   ├── css/
│   │   └── style.css      # CSS styles
│   └── js/
│       └── script.js      # JavaScript functionality
└── env/                   # Virtual environment (auto-created)
```

## Installation

### 1. Create and Activate Virtual Environment

```bash
python -m venv env
env\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Google Cloud Translation

To use the Google Translate API, you need to:

1. Create a Google Cloud project
2. Enable the Cloud Translation API
3. Create a service account and download the JSON key file
4. Set the environment variable:

```bash
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\service-account-key.json"
```

**Alternative: Using Google Translate Free (No Auth Required)**

If you don't have Google Cloud credentials, you can modify `app.py` to use the `googletrans` library:

```bash
pip install googletrans==4.0.0
```

Then replace the translation function in `app.py`:

```python
from googletrans import Translator

translator = Translator()

def translate_text(text, source_language='en', target_language='kn'):
    result = translator.translate(text, src_language=source_language, dest_language=target_language)
    return result['text']
```

## Running the Application

```bash
python app.py
```

The application will start at `http://localhost:5000`

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Enter text in the input field
3. Select source and target languages
4. Click "Translate" or press `Ctrl+Enter`
5. Copy the translated text using the copy button

## Supported Languages

- 🇬🇧 English (en)
- 🇮🇳 Kannada (kn)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Telugu (te)
- 🇮🇳 Tamil (ta)
- 🇮🇳 Malayalam (ml)
- 🇮🇳 Marathi (mr)
- 🇮🇳 Gujarati (gu)

## API Endpoints

### Translate Text
- **Endpoint:** `/translate`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "text": "Hello, how are you?",
    "source_language": "en",
    "target_language": "kn"
  }
  ```
- **Response:**
  ```json
  {
    "original_text": "Hello, how are you?",
    "translated_text": "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
    "source_language": "en",
    "target_language": "kn"
  }
  ```

### Get Supported Languages
- **Endpoint:** `/supported-languages`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "en": "English",
    "kn": "Kannada",
    "hi": "Hindi",
    ...
  }
  ```

## Keyboard Shortcuts

- `Ctrl+Enter` - Translate text
- Click swap button (⇄) - Swap source and target languages

## Technologies Used

- **Backend:** Flask (Python web framework)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** Google Cloud Translation API
- **Styling:** Custom CSS with gradient design

## Tips for Better Translations

1. Use proper grammar and punctuation
2. Keep sentences short and simple
3. Avoid slang and abbreviations
4. For technical terms, provide context
5. Review translations as they may need manual adjustments

## Troubleshooting

### ExecutionPolicy Error
If you get a PowerShell execution policy error:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Google Cloud Credentials Error
Make sure the environment variable is set correctly:
```bash
$env:GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
echo $env:GOOGLE_APPLICATION_CREDENTIALS
```

### Port Already in Use
If port 5000 is already in use, modify `app.py`:
```python
app.run(debug=True, port=5001)
```

## License

This project is open source and available under the MIT License.

## Author

Created as an English to Kannada translator project for language learning and assistance.

## Future Enhancements

- [ ] Add voice input/output
- [ ] Support for more languages
- [ ] Translation history
- [ ] Offline translation support
- [ ] Mobile app version
- [ ] User accounts and favorites
- [ ] Pronunciation guide
- [ ] Context-aware translations

---
https://english-to-kannada-translator-8-dig8.onrender.com
**Happy Translating!** 🎉
