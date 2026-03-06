# -*- coding: utf-8 -*-
"""
Flask API backend for Hybrid Model (MobileNetV2 + DenseNet121 with CBAM)
Classification: digestive vs normal
"""

import os
from flask import Flask, request, jsonify

import python_backend.config_files.config as config
from model_utils import load_model, preprocess_image, predict

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = config.MAX_CONTENT_LENGTH


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'message': 'API is running'})


@app.route('/predict', methods=['POST'])
def predict_endpoint():
    """
    Predict class (digestive / normal) from uploaded image.
    Accepts: multipart/form-data with 'image' file, or raw image bytes.
    """
    try:
        if 'image' in request.files:
            file = request.files['image']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
            return jsonify({
                'error': 'No image provided. Send multipart/form-data with "image" or raw image bytes.'
            }), 400

        if len(image_bytes) == 0:
            return jsonify({'error': 'Empty image'}), 400

        img_array = preprocess_image(image_bytes)
        result = predict(img_array)
        return jsonify(result)

    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/model-info', methods=['GET'])
def model_info():
    """Return model configuration and class labels."""
    return jsonify({
        'classes': config.CLASSES,
        'input_size': [config.IMG_SIZE, config.IMG_SIZE],
        'model_path': config.MODEL_PATH,
    })


if __name__ == '__main__':
    if os.path.exists(config.MODEL_PATH):
        load_model()
        print(f"Model loaded from {config.MODEL_PATH}")
    else:
        print(f"Warning: Model not found at {config.MODEL_PATH}. /predict will fail until model is available.")
    app.run(host=config.HOST, port=config.PORT, debug=False)
