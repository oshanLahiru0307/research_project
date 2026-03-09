# -*- coding: utf-8 -*-
"""Model loading, preprocessing, prediction and Grad-CAM utilities for Spinal Disease Model."""

import io
import os
from typing import Optional

import cv2
import numpy as np
from PIL import Image

import config_files.spinal_model_config as spinal_config

_model = None


def load_spinal_model():
    """Load the Keras model (singleton)."""
    global _model
    if _model is None:
        import tensorflow as tf

        if not os.path.exists(spinal_config.MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {spinal_config.MODEL_PATH}")

        _model = tf.keras.models.load_model(spinal_config.MODEL_PATH)

    return _model


def _decode_and_resize(image_bytes: bytes) -> np.ndarray:
    """Decode raw bytes to RGB image and resize to model input size."""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        img = np.array(Image.open(io.BytesIO(image_bytes)).convert("RGB"))
    else:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    img = cv2.resize(img, (spinal_config.IMG_SIZE, spinal_config.IMG_SIZE))

    return img


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess image for model input.
    Expected input: RGB, IMG_SIZE x IMG_SIZE
    """

    img = _decode_and_resize(image_bytes)
    img = np.array(img, dtype=np.float32)
    # normalize if model trained with rescale=1/255
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img


def predict(image_array: np.ndarray) -> dict:
    """
    Run prediction and return class, confidence, and probabilities.
    """

    model = load_spinal_model()

    # Model expects two inputs
    predictions = model.predict(image_array, image_array, verbose=0)

    probs = predictions[0]
    pred_idx = int(np.argmax(probs))
    pred_class = spinal_config.CLASSES[pred_idx]
    confidence = float(probs[pred_idx])

    return {
        "prediction": pred_class,
        "confidence": round(confidence, 4),
        "probabilities": {
            cls: round(float(p), 4)
            for cls, p in zip(spinal_config.CLASSES, probs)
        },
    }


