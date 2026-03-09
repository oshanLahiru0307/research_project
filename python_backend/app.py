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
<<<<<<< HEAD

from model_utile_files.digestive_model_utils import (
    generate_grad_cam_image,
    load_model,
    predict,
    preprocess_image,
=======
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
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
)

app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = digestive_config.MAX_CONTENT_LENGTH


<<<<<<< HEAD

@app.route("/digestive/predict", methods=["POST"])
def predict_endpoint():
    """
    Predict class (digestive / normal) from uploaded image.
    Accepts: multipart/form-data with 'image' file, or raw image bytes.
    """
=======
@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "message": "API is running"})

# --- Digestive Routes ---

@app.route("/digestive/predict", methods=["POST"])
def digestive_predict_endpoint():
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
    try:
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
<<<<<<< HEAD
            return jsonify(
                {
                    "error": 'No image provided. Send multipart/form-data with "image" or raw image bytes.'
                }
            ), 400
=======
            return jsonify({"error": 'No image provided.'}), 400
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64

        if len(image_bytes) == 0:
            return jsonify({"error": "Empty image"}), 400

<<<<<<< HEAD
        img_array = preprocess_image(image_bytes)
        result = predict(img_array)
        return jsonify(result)

    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/digestive/grad-cam", methods=["POST"])
def grad_cam_endpoint():
    """
    Generate Grad-CAM visualization for an uploaded image.

    Form fields / query params:
    - image: image file (required)
    - layer_name: name of the conv layer to use (required)
    - class_index: optional target class index (int); default is predicted class

    Returns a PNG image with the Grad-CAM overlay.
    """
    try:
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
=======
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
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
            image_bytes = file.read()
        elif request.data:
            image_bytes = request.data
        else:
<<<<<<< HEAD
            return jsonify(
                {
                    "error": 'No image provided. Send multipart/form-data with "image" or raw image bytes.'
                }
            ), 400

        if len(image_bytes) == 0:
            return jsonify({"error": "Empty image"}), 400

        # Layer name can come from form or query params
=======
            return jsonify({"error": 'No image provided.'}), 400

>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
        layer_name = request.form.get("layer_name") or request.args.get("layer_name")
        if not layer_name:
            return jsonify({"error": "Missing required parameter 'layer_name'"}), 400

<<<<<<< HEAD
        class_index_raw = request.form.get("class_index") or request.args.get(
            "class_index"
        )
        class_index = int(class_index_raw) if class_index_raw is not None else None

        overlay = generate_grad_cam_image(
            image_bytes=image_bytes,
            layer_name=layer_name,
            class_index=class_index,
        )

        # Encode as PNG for response
        bgr = cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR)
        success, buffer = cv2.imencode(".png", bgr)
        if not success:
            return jsonify({"error": "Failed to encode Grad-CAM image"}), 500

        return send_file(
            io.BytesIO(buffer.tobytes()),
            mimetype="image/png",
            as_attachment=False,
            download_name="grad_cam.png",
        )

    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 500
    except ValueError as e:
        return jsonify({"error": f"Invalid parameter: {e}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/digestive/model-info", methods=["GET"])
def model_info():
    """Return model configuration and class labels."""
    return jsonify(
        {
            "classes": digestive_config.CLASSES,
            "input_size": [digestive_config.IMG_SIZE, digestive_config.IMG_SIZE],
            "model_path": digestive_config.MODEL_PATH,
        }
    )


if __name__ == "__main__":
    if os.path.exists(digestive_config.MODEL_PATH):
        load_model()
        print(f"Model loaded from {digestive_config.MODEL_PATH}")
    else:
        print(
            f"Warning: Model not found at {digestive_config.MODEL_PATH}. /predict and /grad-cam will fail until model is available."
        )
=======
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

>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
    app.run(host=digestive_config.HOST, port=digestive_config.PORT, debug=False)

