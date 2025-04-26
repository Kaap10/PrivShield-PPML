import numpy as np
import torch
import torch.nn as nn
from typing import Dict, List, Any
from ..utils.encryption import encrypt_model_update, decrypt_model_update

class FederatedModel:
    def __init__(self):
        self.global_model = self._create_model()
        self.client_models: Dict[str, Any] = {}
        self.training_rounds = 0
        self.client_updates: Dict[str, List[Any]] = {}
        
    def _create_model(self) -> nn.Module:
        """Create a simple neural network model"""
        model = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10)
        )
        return model
    
    def update(self, model_update: Dict[str, Any], client_id: str):
        """Update the global model with client's model update"""
        if client_id not in self.client_updates:
            self.client_updates[client_id] = []
        
        self.client_updates[client_id].append(model_update)
        
        # Aggregate updates from all clients
        if len(self.client_updates) >= 2:  # Minimum 2 clients for aggregation
            self._aggregate_updates()
            self.training_rounds += 1
    
    def _aggregate_updates(self):
        """Aggregate model updates from all clients using FedAvg"""
        aggregated_weights = {}
        
        # Initialize aggregated weights
        for key in self.global_model.state_dict().keys():
            aggregated_weights[key] = torch.zeros_like(self.global_model.state_dict()[key])
        
        # Sum up all client updates
        total_clients = len(self.client_updates)
        for client_updates in self.client_updates.values():
            for update in client_updates:
                for key in update.keys():
                    aggregated_weights[key] += update[key] / total_clients
        
        # Update global model
        self.global_model.load_state_dict(aggregated_weights)
        
        # Clear client updates after aggregation
        self.client_updates.clear()
    
    def get_model_for_client(self, client_id: str) -> Dict[str, Any]:
        """Get the current global model for a client"""
        return self.global_model.state_dict()
    
    def get_client_count(self) -> int:
        """Get the number of active clients"""
        return len(self.client_models)
    
    def get_training_rounds(self) -> int:
        """Get the number of completed training rounds"""
        return self.training_rounds
    
    def get_model_accuracy(self) -> float:
        """Get the current model accuracy"""
        # This would typically be calculated on a validation set
        return 0.0  # Placeholder 