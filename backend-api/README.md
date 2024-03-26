# Rhombus AI BACKEND API 

The API application allows users to upload CSV or Excel documents for data processing and visualization.

#### Deliverables

Developing a Django application with a RESTFul API.

 - Set up a Django project incorporating your Python script for data  processing.
 - Create Django models, views, and URLs to handle the data processing  logic and user interactions. 
 - Implement a backend API that works with the frontend, handling data  input and output.


### Ports

Ensure that the following port is not occupied by any other service when starting:

- :8000 (Development Server)

### Stating the DEV server procedure

### Requirements

- Python 3.10+

### Running the Application

Launch the development server.

```shell
# Install necessary Python libraries
pip install -r requirements.txt
# Copy env.example to .env
cp env.example .env
# Apply migrations
./manage.py migrate
# Start the server
./manage.py runserver
```

### Documentation
[Redoc](http://localhost:8000/redoc/)
