# %% import libraries
import os
from util.logger import create_logger
from logging import getLogger
from util.arg_parser import parse_args
import sqlite3

# %% set up
def main():
    # Handle arguments from the command line
    args = parse_args()
    DEBUG = args.debug

    # Logger
    create_logger(debug=DEBUG)

    # Path
    THIS_DIR = os.path.dirname(os.path.abspath(__file__))

    getLogger().debug(THIS_DIR)


if __name__ == "__main__":
    main()
