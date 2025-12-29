FROM public.ecr.aws/lambda/python:3.12

# Copy requirements and install
COPY requirements.txt .
RUN pip install --default-timeout=1000 -r requirements.txt

# Copy application code
COPY . .

# Lambda entrypoint
CMD ["main.lambda_handler"]
