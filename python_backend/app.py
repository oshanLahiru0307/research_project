# -*- coding: utf-8 -*-
"""
Flask API backend for Hybrid Model (MobileNetV2 + DenseNet121 with CBAM)
Classification: digestive vs normal
"""

import io
import os

import cv2
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

import config_files.digestive_model_config as digestive_config
import config_files.liver_model_config as liver_config

from model_utile_files.digestive_model_utils import (
    generate_grad_cam_image as generate_grad_cam_digestive,
    load_model as load_digestive_model,
    predict as predict_digestive,
    preprocess_image as preprocess_digestive_image,
)
from model_utile_files.liver_model_utils import (
    generate_grad_cam_liver_image as generate_grad_cam_liver,
    load_liver_model,
    predict_liver,
    preprocess_liver_image,
)

app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = digestive_config.MAX_CONTENT_LENGTH


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "message": "API is running"})

# --- Digestive Routes ---

@app.route("/digestive/predict", methods=["POST"])
def digestive_predict_endpoint():
    try:
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
            return jsonify({"error": 'No image provided.'}), 400

        if len(image_bytes) == 0:
            return jsonify({"error": "Empty image"}), 400

        img_array = preprocess_digestive_image(image_bytes)
        result = predict_digestive(img_array)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/digestive/grad-cam", methods=["POST"])
def digestive_grad_cam_endpoint():
    try:
        if "image" in request.files:
            file = request.files["image"]
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
            return jsonify({"error": 'No image provided.'}), 400

        layer_name = request.form.get("layer_name") or request.args.get("layer_name")
        if not layer_name:
            return jsonify({"error": "Missing required parameter 'layer_name'"}), 400

        overlay = generate_grad_cam_digestive(image_bytes=image_bytes, layer_name=layer_name)
        bgr = cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR)
        success, buffer = cv2.imencode(".png", bgr)
        return send_file(io.BytesIO(buffer.tobytes()), mimetype="image/png")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Liver Routes ---

@app.route("/liver/predict", methods=["POST"])
def liver_predict_endpoint():
    """Predict liver disease from uploaded image."""
    try:
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
            return jsonify({"error": 'No image provided.'}), 400

        if len(image_bytes) == 0:
            return jsonify({"error": "Empty image"}), 400

        img_array = preprocess_liver_image(image_bytes)
        result = predict_liver(img_array, image_bytes=image_bytes)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/liver/grad-cam", methods=["POST"])
def liver_grad_cam_endpoint():
    """Generate Grad-CAM visualization for liver model."""
    try:
        if "image" in request.files:
            file = request.files["image"]
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
            return jsonify({"error": 'No image provided.'}), 400

        layer_name = request.form.get("layer_name") or request.args.get("layer_name")
        if not layer_name:
            return jsonify({"error": "Missing required parameter 'layer_name'"}), 400

        overlay = generate_grad_cam_liver(image_bytes=image_bytes, layer_name=layer_name)
        bgr = cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR)
        success, buffer = cv2.imencode(".png", bgr)
        return send_file(io.BytesIO(buffer.tobytes()), mimetype="image/png")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/liver/model-info", methods=["GET"])
def liver_model_info():
    """Return liver model configuration."""
    return jsonify({
        "classes": liver_config.CLASSES,
        "input_size": [liver_config.IMG_SIZE, liver_config.IMG_SIZE],
        "model_path": liver_config.MODEL_PATH,
    })

@app.route("/digestive/model-info", methods=["GET"])
def digestive_model_info():
    return jsonify({
        "classes": digestive_config.CLASSES,
        "input_size": [digestive_config.IMG_SIZE, digestive_config.IMG_SIZE],
        "model_path": digestive_config.MODEL_PATH,
    })


if __name__ == "__main__":
    # Load Digestive Model
    if os.path.exists(digestive_config.MODEL_PATH):
        load_digestive_model()
        print(f"Digestive Model loaded from {digestive_config.MODEL_PATH}")
    else:
        print(f"Warning: Digestive Model not found at {digestive_config.MODEL_PATH}")

    # Load Liver Model
    if os.path.exists(liver_config.MODEL_PATH):
        load_liver_model()
        print(f"Liver Model loaded from {liver_config.MODEL_PATH}")
    else:
        print(f"Warning: Liver Model not found at {liver_config.MODEL_PATH}")

    app.run(host=digestive_config.HOST, port=digestive_config.PORT, debug=False)

