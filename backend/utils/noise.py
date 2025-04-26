import numpy as np
from typing import List, Union

def add_laplace_noise(values: Union[float, List[float]], epsilon: float, sensitivity: float) -> np.ndarray:
    """
    Add Laplace noise to values for differential privacy.
    
    Args:
        values: Single value or list of values to add noise to
        epsilon: Privacy parameter (smaller epsilon = more privacy)
        sensitivity: Maximum change in the function's output when one record is changed
    
    Returns:
        Noisy values as numpy array
    """
    if isinstance(values, (int, float)):
        values = [values]
    
    values = np.array(values)
    scale = sensitivity / epsilon
    
    # Generate Laplace noise
    noise = np.random.laplace(0, scale, size=values.shape)
    
    # Add noise to values
    noisy_values = values + noise
    
    return noisy_values

def add_gaussian_noise(values: Union[float, List[float]], epsilon: float, delta: float, sensitivity: float) -> np.ndarray:
    """
    Add Gaussian noise to values for differential privacy.
    
    Args:
        values: Single value or list of values to add noise to
        epsilon: Privacy parameter
        delta: Privacy parameter (probability of privacy failure)
        sensitivity: Maximum change in the function's output when one record is changed
    
    Returns:
        Noisy values as numpy array
    """
    if isinstance(values, (int, float)):
        values = [values]
    
    values = np.array(values)
    
    # Calculate sigma for Gaussian noise
    sigma = sensitivity * np.sqrt(2 * np.log(1.25 / delta)) / epsilon
    
    # Generate Gaussian noise
    noise = np.random.normal(0, sigma, size=values.shape)
    
    # Add noise to values
    noisy_values = values + noise
    
    return noisy_values 