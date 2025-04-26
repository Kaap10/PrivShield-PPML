from cryptography.fernet import Fernet
import base64
import json
from typing import Dict, Any
import os

# Generate or load encryption key
def get_encryption_key() -> bytes:
    """Get or generate encryption key"""
    key_file = '.encryption_key'
    if os.path.exists(key_file):
        with open(key_file, 'rb') as f:
            return f.read()
    else:
        key = Fernet.generate_key()
        with open(key_file, 'wb') as f:
            f.write(key)
        return key

# Initialize Fernet cipher
cipher = Fernet(get_encryption_key())

def encrypt_model_update(model_update: Dict[str, Any]) -> str:
    """
    Encrypt model update data
    
    Args:
        model_update: Dictionary containing model parameters
    
    Returns:
        Encrypted string
    """
    # Convert model update to JSON string
    json_data = json.dumps(model_update)
    
    # Encrypt the JSON string
    encrypted_data = cipher.encrypt(json_data.encode())
    
    # Convert to base64 for safe transmission
    return base64.b64encode(encrypted_data).decode()

def decrypt_model_update(encrypted_data: str) -> Dict[str, Any]:
    """
    Decrypt model update data
    
    Args:
        encrypted_data: Base64 encoded encrypted string
    
    Returns:
        Decrypted model update dictionary
    """
    # Decode base64
    encrypted_bytes = base64.b64decode(encrypted_data)
    
    # Decrypt the data
    decrypted_data = cipher.decrypt(encrypted_bytes)
    
    # Parse JSON
    return json.loads(decrypted_data.decode())

def encrypt_data(data: Any) -> str:
    """
    Encrypt any data
    
    Args:
        data: Data to encrypt
    
    Returns:
        Encrypted string
    """
    # Convert data to JSON string
    json_data = json.dumps(data)
    
    # Encrypt the JSON string
    encrypted_data = cipher.encrypt(json_data.encode())
    
    # Convert to base64 for safe transmission
    return base64.b64encode(encrypted_data).decode()

def decrypt_data(encrypted_data: str) -> Any:
    """
    Decrypt any data
    
    Args:
        encrypted_data: Base64 encoded encrypted string
    
    Returns:
        Decrypted data
    """
    # Decode base64
    encrypted_bytes = base64.b64decode(encrypted_data)
    
    # Decrypt the data
    decrypted_data = cipher.decrypt(encrypted_bytes)
    
    # Parse JSON
    return json.loads(decrypted_data.decode()) 