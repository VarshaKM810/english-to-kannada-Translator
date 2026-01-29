from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

def translate_text(text, source_language='en', target_language='kn'):
    """
    Translate text using MyMemory Translation API (free, no authentication needed)
    """
    try:
        # Using MyMemory API - free translation service
        url = "https://api.mymemory.translated.net/get"
        params = {
            'q': text,
            'langpair': f'{source_language}|{target_language}'
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('responseStatus') == 200:
            translated_text = data.get('responseData', {}).get('translatedText', '')
            return translated_text if translated_text else text
        else:
            return f"Translation service error: {data.get('responseDetails', 'Unknown error')}"
    except requests.exceptions.Timeout:
        return "Translation request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return f"Error during translation: {str(e)}"
    except Exception as e:
        return f"Error during translation: {str(e)}"


@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')


@app.route('/translate', methods=['POST'])
def translate():
    """Handle translation requests"""
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data.get('text', '').strip()
    source_lang = data.get('source_language', 'en')
    target_lang = data.get('target_language', 'kn')
    
    if not text:
        return jsonify({'error': 'Text cannot be empty'}), 400
    
    translated_text = translate_text(text, source_lang, target_lang)
    
    return jsonify({
        'original_text': text,
        'translated_text': translated_text,
        'source_language': source_lang,
        'target_language': target_lang
    })


@app.route('/supported-languages', methods=['GET'])
def supported_languages():
    """Return list of supported languages"""
    languages = {
        'en': 'English',
        'kn': 'Kannada',
        'hi': 'Hindi',
        'te': 'Telugu',
        'ta': 'Tamil',
        'ml': 'Malayalam',
        'mr': 'Marathi',
        'gu': 'Gujarati'
    }
    return jsonify(languages)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
