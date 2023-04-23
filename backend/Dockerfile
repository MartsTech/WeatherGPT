FROM python:3.11-alpine as base

WORKDIR /app
COPY requirements.txt /app

RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app

EXPOSE 8000
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8000"]