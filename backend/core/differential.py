import numpy as np
from typing import List, Any, Callable
from ..utils.noise import add_laplace_noise, add_gaussian_noise

class DifferentialPrivacy:
    def __init__(self, total_budget: float = 1.0):
        self.total_budget = total_budget
        self.used_budget = 0.0
    
    def calculate_sensitivity(self, dataset: List[Any], function: Callable) -> float:
        """
        Calculate the sensitivity of a function on a dataset.
        Sensitivity is the maximum change in the function's output when one record is changed.
        """
        if not dataset:
            return 0.0
        
        # Calculate function on original dataset
        original_result = function(dataset)
        
        # Calculate maximum change by removing one record at a time
        max_change = 0.0
        for i in range(len(dataset)):
            # Create a copy of the dataset with one record removed
            modified_dataset = dataset.copy()
            modified_dataset.pop(i)
            
            # Calculate function on modified dataset
            modified_result = function(modified_dataset)
            
            # Calculate change
            change = abs(original_result - modified_result)
            max_change = max(max_change, change)
        
        return max_change
    
    def add_noise(self, value: float, epsilon: float, sensitivity: float, delta: float = None) -> float:
        """
        Add noise to a value while respecting the privacy budget.
        
        Args:
            value: Value to add noise to
            epsilon: Privacy parameter
            sensitivity: Maximum change in the function's output
            delta: Privacy parameter for Gaussian noise (optional)
        
        Returns:
            Noisy value
        """
        if self.used_budget + epsilon > self.total_budget:
            raise ValueError("Not enough privacy budget remaining")
        
        if delta is not None:
            # Use Gaussian noise
            noisy_value = add_gaussian_noise(value, epsilon, delta, sensitivity)
        else:
            # Use Laplace noise
            noisy_value = add_laplace_noise(value, epsilon, sensitivity)
        
        self.used_budget += epsilon
        return noisy_value
    
    def get_remaining_budget(self) -> float:
        """Get the remaining privacy budget"""
        return self.total_budget - self.used_budget
    
    def get_total_budget(self) -> float:
        """Get the total privacy budget"""
        return self.total_budget
    
    def reset_budget(self):
        """Reset the privacy budget"""
        self.used_budget = 0.0 