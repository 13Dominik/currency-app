# Get official Python 3.9 image
FROM python:3.9

# Set working directory to /app
WORKDIR /app

# Copy the application requirements file into the container
COPY requirements.txt .

# Install application dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application into the container
COPY . .

# Set environment variable FLASK_APP to the application file
ENV FLASK_APP=main.py

# Set the port that the application will run on
EXPOSE 5000

# Run the application
CMD [ "flask", "run", "--host=0.0.0.0" ]