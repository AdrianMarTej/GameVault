import logging
import sys

class Config:
    def __init__(self):
        logging.basicConfig(
                level=logging.DEBUG,
                format="%(asctime)s [%(levelname)-5.5s]  %(message)s",
                handlers=[ logging.StreamHandler(sys.stdout) ]
            )
        self.logger = logging.getLogger()