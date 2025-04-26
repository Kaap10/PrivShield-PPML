#!/bin/bash

# Create main project structure
mkdir -p backend/{core,api,utils,config,tests}
mkdir -p frontend/{src/{components,pages},public}
mkdir -p docs/guides
mkdir -p examples
mkdir -p scripts

# Create backend files
touch backend/core/__init__.py
touch backend/core/federated.py
touch backend/core/differential.py
touch backend/core/secure.py

touch backend/api/__init__.py
touch backend/api/routes.py

touch backend/utils/__init__.py
touch backend/utils/encryption.py
touch backend/utils/noise.py
touch backend/utils/validation.py

touch backend/config/__init__.py
touch backend/config/settings.py

touch backend/tests/__init__.py
touch backend/tests/test_federated.py
touch backend/tests/test_differential.py
touch backend/tests/test_secure.py

touch backend/app.py

# Create example files
touch examples/federated_example.py
touch examples/differential_example.py
touch examples/secure_example.py

# Create documentation
touch docs/api.md
touch docs/guides/getting-started.md
touch docs/guides/security.md

# Create environment file
cat > .env << EOL
# Application settings
DEBUG=True
PORT=5000
HOST=0.0.0.0

# Security settings
SECRET_KEY=your-secret-key-here
ENCRYPTION_KEY_FILE=.encryption_key

# Federated Learning settings
MIN_CLIENTS_FOR_AGGREGATION=2
MODEL_UPDATE_INTERVAL=60

# Differential Privacy settings
DEFAULT_EPSILON=1.0
DEFAULT_DELTA=1e-5
PRIVACY_BUDGET=1.0

# Secure MPC settings
SMPC_PARTIES=3
SMPC_THRESHOLD=2

# Logging settings
LOG_LEVEL=INFO
LOG_FILE=ppml.log

# Database settings
DATABASE_URL=sqlite:///ppml.db

# API settings
API_PREFIX=/api
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
EOL

# Create test script
cat > scripts/test.sh << EOL
#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Run tests
python -m pytest backend/tests/
EOL

# Make scripts executable
chmod +x scripts/setup.sh
chmod +x scripts/test.sh

echo "Project structure created successfully!"
echo "Please review the .env file and update the SECRET_KEY." 