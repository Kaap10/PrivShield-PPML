from flask import Blueprint, request, jsonify
from ..core.federated import FederatedModel
from ..core.differential import DifferentialPrivacy
from ..core.secure import SecureMPC
from ..utils.validation import (
    validate_model_update,
    validate_privacy_params,
    validate_client_id,
    validate_dataset
)

# Initialize models
federated_model = FederatedModel()
dp = DifferentialPrivacy()
mpc = SecureMPC()

# Create blueprints
api_bp = Blueprint('api', __name__)

# Federated Learning routes
@api_bp.route('/federated/train', methods=['POST'])
def train():
    try:
        data = request.get_json()
        client_id = data.get('client_id')
        model_update = data.get('model_update')
        
        # Validate input
        if not validate_client_id(client_id):
            return jsonify({"error": "Invalid client ID"}), 400
        
        if not validate_model_update(model_update):
            return jsonify({"error": "Invalid model update"}), 400
        
        # Update model
        federated_model.update(model_update, client_id)
        
        return jsonify({
            "status": "success",
            "message": "Model update received and processed"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_bp.route('/federated/model', methods=['GET'])
def get_model():
    try:
        client_id = request.args.get('client_id')
        
        if not validate_client_id(client_id):
            return jsonify({"error": "Invalid client ID"}), 400
        
        model = federated_model.get_model_for_client(client_id)
        
        return jsonify({
            "status": "success",
            "model": model
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Differential Privacy routes
@api_bp.route('/differential/noise', methods=['POST'])
def add_noise():
    try:
        data = request.get_json()
        values = data.get('values')
        epsilon = data.get('epsilon', 1.0)
        sensitivity = data.get('sensitivity', 1.0)
        
        # Validate input
        if not validate_dataset(values):
            return jsonify({"error": "Invalid dataset"}), 400
        
        if not validate_privacy_params(epsilon):
            return jsonify({"error": "Invalid privacy parameters"}), 400
        
        # Add noise
        noisy_values = dp.add_noise(values, epsilon, sensitivity)
        
        return jsonify({
            "status": "success",
            "noisy_values": noisy_values.tolist()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Secure MPC routes
@api_bp.route('/secure/sum', methods=['POST'])
def secure_sum():
    try:
        data = request.get_json()
        values = data.get('values')
        
        # Validate input
        if not validate_dataset(values):
            return jsonify({"error": "Invalid dataset"}), 400
        
        # Compute secure sum
        result = mpc.secure_sum(values)
        
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_bp.route('/secure/mean', methods=['POST'])
def secure_mean():
    try:
        data = request.get_json()
        values = data.get('values')
        
        # Validate input
        if not validate_dataset(values):
            return jsonify({"error": "Invalid dataset"}), 400
        
        # Compute secure mean
        result = mpc.secure_mean(values)
        
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_bp.route('/secure/variance', methods=['POST'])
def secure_variance():
    try:
        data = request.get_json()
        values = data.get('values')
        
        # Validate input
        if not validate_dataset(values):
            return jsonify({"error": "Invalid dataset"}), 400
        
        # Compute secure variance
        result = mpc.secure_variance(values)
        
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400 