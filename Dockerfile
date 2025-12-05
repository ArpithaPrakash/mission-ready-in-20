FROM python:3.11-slim

# Install system dependencies (including LibreOffice)
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    libreoffice-impress \
    libreoffice-calc \
    fonts-dejavu \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose Railway port
ENV PORT=10000
EXPOSE 10000

# Start FastAPI server
CMD ["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "10000"]
