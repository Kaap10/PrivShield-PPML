from typing import Any, Dict, List, Union
import numpy as np
from ..config.settings import DEFAULT_EPSILON, DEFAULT_DELTA

def validate_model_update(model_update: Dict[str, Any]) -> bool:
    """
    Validate model update data
    
    Args:
        model_update: Dictionary containing model parameters
    
    Returns:
        bool: True if valid, False otherwise
    """
    if not isinstance(model_update, dict):
        return False
    
    # Check for required keys
    required_keys = ['weights', 'bias']
    if not all(key in model_update for key in required_keys):
        return False
    
    # Validate weights
    if not isinstance(model_update['weights'], (list, np.ndarray)):
        return False
    
    # Validate bias
    if not isinstance(model_update['bias'], (list, np.ndarray)):
        return False
    
    return True

def validate_privacy_params(epsilon: float, delta: float = None) -> bool:
    """
    Validate privacy parameters
    
    Args:
        epsilon: Privacy parameter
        delta: Privacy parameter (optional)
    
    Returns:
        bool: True if valid, False otherwise
    """
    if not isinstance(epsilon, (int, float)) or epsilon <= 0:
        return False
    
    if delta is not None:
        if not isinstance(delta, (int, float)) or delta <= 0 or delta >= 1:
            return False
    
    return True

def validate_client_id(client_id: str) -> bool:
    """
    Validate client ID
    
    Args:
        client_id: Client identifier
    
    Returns:
        bool: True if valid, False otherwise
    """
    if not isinstance(client_id, str) or not client_id:
        return False
    
    # Add any specific client ID validation rules here
    return True

def validate_dataset(dataset: Union[List[Any], np.ndarray]) -> bool:
    """
    Validate dataset
    
    Args:
        dataset: Dataset to validate
    
    Returns:
        bool: True if valid, False otherwise
    """
    if not isinstance(dataset, (list, np.ndarray)):
        return False
    
    if len(dataset) == 0:
        return False
    
    return True

def validate_encryption_params(key_size: int) -> bool:
    """
    Validate encryption parameters
    
    Args:
        key_size: Size of encryption key
    
    Returns:
        bool: True if valid, False otherwise
    """
    if not isinstance(key_size, int) or key_size < 1024:
        return False
    
    return True 