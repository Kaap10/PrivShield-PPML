from flask import Blueprint, request, jsonify
import numpy as np
from ..models.differential import DifferentialPrivacy
from ..utils.noise import add_laplace_noise

differential_bp = Blueprint('differential', __name__)

# Initialize differential privacy
dp = DifferentialPrivacy()

@differential_bp.route('/add-noise', methods=['POST'])
def add_noise():
    try:
        data = request.get_json()
        values = data.get('values')
        epsilon = data.get('epsilon', 1.0)
        sensitivity = data.get('sensitivity', 1.0)
        
        # Add Laplace noise to the values
        noisy_values = add_laplace_noise(values, epsilon, sensitivity)
        
        return jsonify({
            "status": "success",
            "noisy_values": noisy_values.tolist()
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@differential_bp.route('/calculate-sensitivity', methods=['POST'])
def calculate_sensitivity():
    try:
        data = request.get_json()
        dataset = data.get('dataset')
        function = data.get('function')
        
        sensitivity = dp.calculate_sensitivity(dataset, function)
        
        return jsonify({
            "status": "success",
            "sensitivity": sensitivity
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@differential_bp.route('/privacy-budget', methods=['GET'])
def get_privacy_budget():
    return jsonify({
        "status": "success",
        "remaining_budget": dp.get_remaining_budget(),
        "total_budget": dp.get_total_budget()
    }) 