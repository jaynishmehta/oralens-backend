from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# To store data temporarily
form_data = {}

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome to the Flask Backend!", 200  # HTTP status code 200 for OK

@app.route('/form', methods=['POST'])
def handle_form():
    # Get JSON data from the request body
    data = request.get_json()
    name = data.get('name')
    age = data.get('age')
    file_name = data.get('file')  # The file name passed from the frontend

    # Store the received data in a global dictionary
    form_data["name"] = name
    form_data["age"] = age
    form_data["file"] = file_name

    # Debugging: Print received JSON data
    print(f"Received JSON data: Name = {name}, Age = {age}, File = {file_name}")

    return jsonify({
        "status": "success",
        "message": "Data received successfully",
        "received_data": form_data
    })

@app.route('/form-print', methods=['GET'])
def print_form_data():
    # Check if data exists
    if not form_data:
        return jsonify({"status": "error", "message": "No data available"}), 400

    # Return the received data as a response
    return jsonify({
        "status": "success",
        "received_data": form_data
    })

if __name__ == "__main__":
    app.run(debug=True)
