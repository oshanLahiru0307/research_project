# -*- coding: utf-8 -*-
"""Model loading and image preprocessing utilities."""

import io
import os
import numpy as np
import cv2
from PIL import Image

import config

_model = None


def load_model():
    """Load the Keras model (singleton)."""
    global _model
    if _model is None:
        import tensorflow as tf
        if not os.path.exists(config.MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {config.MODEL_PATH}")
        _model = tf.keras.models.load_model(config.MODEL_PATH)
    return _model


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess image for model input.
    Expects RGB, 256x256, float32 - matching training pipeline.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        img = np.array(Image.open(io.BytesIO(image_bytes)).convert('RGB'))
    else:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    img = cv2.resize(img, (config.IMG_SIZE, config.IMG_SIZE))
    img = np.array(img, dtype=np.float32)
    img = np.expand_dims(img, axis=0)
    return img


def predict(image_array: np.ndarray) -> dict:
    """
    Run prediction and return class, confidence, and probabilities.
    """
    model = load_model()
    predictions = model.predict(image_array, verbose=0)
    probs = predictions[0]
    pred_idx = int(np.argmax(probs))
    pred_class = config.CLASSES[pred_idx]
    confidence = float(probs[pred_idx])

    return {
        'prediction': pred_class,
        'confidence': round(confidence, 4),
        'probabilities': {
            cls: round(float(p), 4) for cls, p in zip(config.CLASSES, probs)
        }
    }
