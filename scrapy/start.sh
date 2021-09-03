ENV_NAME="cnki_news_env"

source ~/miniconda3/etc/profile.d/conda.sh &&
conda activate ${ENV_NAME} &&
cd cnki_news &&
scrapy crawl cnki_news