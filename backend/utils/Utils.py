import json
import logging
import math
from typing import Any, Dict

import boto3
from configs.config import DEFAULT_KB_ID, PRODUCTS, SEMANTIC_SCORE_MODEL_ID



logger = logging.getLogger()


def get_output(obj: Dict[str, Any]) -> Dict[str, Any]:
    if (
        isinstance(obj, dict)
        and "output" in obj
        and isinstance(obj["output"], dict)
    ):
        output_block = obj["output"]
    else:
        output_block = obj
    return output_block


def parse_event(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize AgentCore incoming event structure.
    """
    logger.info(f"Received event: {event}")

    if (
        isinstance(event, dict)
        and "input" in event
        and isinstance(event["input"], dict)
    ):
        input_block = event["input"]
    else:
        input_block = event

    text = input_block.get("text") or input_block.get("inputText") or None
    product_name = input_block.get("product_id")
    llm_model_configs = input_block.get("llm_model_configs")
    expected_answer = input_block.get("expected_answer")
    agent_session_id = input_block.get("agent_session_id")
    return {
        "text": text,
        "product_id": product_name,
        "agent_session_id": agent_session_id,
        "llm_model_configs": llm_model_configs,
        "expected_answer": expected_answer,
        "raw_event": event,
    }


def match_kb_id(product_name: str) -> str:
    """
    Maps a product name to a KB ID.
    """
    if not product_name:
      return DEFAULT_KB_ID
    product = PRODUCTS.get(product_name)
    if product is None or product.get("kb_id", "") == "":
      return DEFAULT_KB_ID
    return product.get("kb_id", DEFAULT_KB_ID)


def normalize_classifier_output(raw):
    """
    Normalizes classifier output.
    """
    raw = raw.strip()
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, dict):
            return str(parsed.get("product") or raw).lower()
    except Exception:
        pass

    return raw.lower()

def get_embedding(text: str, client=None) -> list[float]:
    if not text:
        return []

    try:
        if client is None:
            raise ValueError("Client must be provided to get_embedding")

        payload = {"inputText": text}

        response = client.invoke_model(
            body=json.dumps(payload),
            modelId=SEMANTIC_SCORE_MODEL_ID,
            accept="application/json",
            contentType="application/json"
        )

        response_body = json.loads(response["body"].read())

        embedding = (
            response_body.get("embedding") or
            response_body.get("embeddings", {}).get("embedding")
        )

        if not embedding:
            return []

        return embedding

    except Exception as e:
        return []


def cosine_similarity(vec1: list[float], vec2: list[float]) -> float:
    """
    Calculates the cosine similarity between two vectors.
    """
    if not vec1 or not vec2:
        return 0.0
    
    if len(vec1) != len(vec2):
        return 0.0

    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(a * a for a in vec1))
    magnitude2 = math.sqrt(sum(b * b for b in vec2))
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
        
    return dot_product / (magnitude1 * magnitude2)

def calculate_semantic_similarity(text1: str, text2: str, client=None) -> float:
    """Calculate semantic similarity with comprehensive error handling."""
    try:
        if not text1 or not text2:
            return 0.0

        # Use client from handler
        if client is None:
            raise ValueError("Client must be provided to calculate_semantic_similarity")

        # Get embeddings with error handling for each
        try:
            emb1 = get_embedding(text1, client)
        except Exception as e:
            return 0.0
        
        try:
            emb2 = get_embedding(text2, client)
        except Exception as e:
            return 0.0

        if not emb1 or not emb2:
            return 0.0

        try:
            return cosine_similarity(emb1, emb2)
        except Exception as e:
            return 0.0
            
    except Exception as e:
        return 0.0
