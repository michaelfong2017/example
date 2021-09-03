ENV_NAME="cnki_news_env"

RED='\033[1;31m'
GREEN='\033[1;32m'
CYAN='\033[1;36m'
NC='\033[0m' # No Color

if !(conda info --envs | grep ${ENV_NAME}); then
    echo
    echo -e $RED"Installing the conda environment ${ENV_NAME}"$NC
    echo
    conda create -n ${ENV_NAME} python=3.7.10 -y
else
    echo -e $CYAN"Activating environment ${ENV_NAME}"$NC
#   return 1  # we are source'd so we cannot use exit
fi

source ~/miniconda3/etc/profile.d/conda.sh &&
conda activate ${ENV_NAME} &&
pip install --upgrade pip &&
conda install -c conda-forge ipykernel -y &&
conda install -c conda-forge scrapy -y &&
conda install -c conda-forge orjson -y &&
conda install -c conda-forge requests -y