env_name="linux-env"

python3 -m venv $env_name

$env_name/bin/python -m pip install --upgrade pip
$env_name/bin/python -m pip install ipykernel