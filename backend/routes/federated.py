from flask import Blueprint, request, jsonify
import numpy as np
from ..models.federated import FederatedModel
from ..utils.encryption import encrypt_model_update, decrypt_model_update

federated_bp = Blueprint('federated', __name__)

# Initialize federated model
federated_model = FederatedModel()

@federated_bp.route('/train', methods=['POST'])
def train():
    try:
        data = request.get_json()
        client_id = data.get('client_id')
        model_update = data.get('model_update')
        
        # Decrypt model update if encrypted
        if data.get('encrypted', False):
            model_update = decrypt_model_update(model_update)
        
        # Update global model
        federated_model.update(model_update, client_id)
        
        return jsonify({
            "status": "success",
            "message": "Model update received and processed"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@federated_bp.route('/get-model', methods=['GET'])
def get_model():
    try:
        client_id = request.args.get('client_id')
        model = federated_model.get_model_for_client(client_id)
        
        # Encrypt model if requested
        if request.args.get('encrypt', 'false').lower() == 'true':
            model = encrypt_model_update(model)
        
        return jsonify({
            "status": "success",
            "model": model
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@federated_bp.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "success",
        "clients": federated_model.get_client_count(),
        "rounds": federated_model.get_training_rounds(),
        "model_accuracy": federated_model.get_model_accuracy()
    }) 