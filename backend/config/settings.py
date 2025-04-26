import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Application settings
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
PORT = int(os.getenv('PORT', 5000))
HOST = os.getenv('HOST', '0.0.0.0')

# Security settings
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
ENCRYPTION_KEY_FILE = '.encryption_key'

# Federated Learning settings
MIN_CLIENTS_FOR_AGGREGATION = 2
MODEL_UPDATE_INTERVAL = 60  # seconds

# Differential Privacy settings
DEFAULT_EPSILON = 1.0
DEFAULT_DELTA = 1e-5
PRIVACY_BUDGET = 1.0

# Homomorphic Encryption settings
HE_KEY_SIZE = 2048
HE_PLAINTEXT_MODULUS = 2**32

# Secure MPC settings
SMPC_PARTIES = 3
SMPC_THRESHOLD = 2

# Logging settings
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = 'ppml.log'

# Database settings (if needed)
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///ppml.db')

# API settings
API_PREFIX = '/api'
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',') 