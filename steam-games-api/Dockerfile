FROM python:3.13.0a6-alpine3.19

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "main.py" ]