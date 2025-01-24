from flask import Flask, jsonify

app = Flask(__name__)

from flask import Flask, jsonify
import requests

app = Flask(__name__)

API_TOKEN = '09e1e4b65fed6c83400880a2d49ba17d'
MOODLE_API_URL = 'https://smartcampus.moodlecloud.com/?redirect=0'

def fetch_assignments_from_api():
    params = {
        'wstoken': API_TOKEN,
        'wsfunction': 'mod_assign_get_assignments',
        'moodlewsrestformat': 'json'
    }
    response = requests.post(MOODLE_API_URL, data=params)
    if response.status_code == 200:
        return response.json()  # Parse and return the JSON response
    return {"error": "Failed to fetch assignments"}

@app.route('/assignments', methods=['GET'])
def get_assignments():
    assignments = fetch_assignments_from_api()
    return jsonify(assignments)

if __name__ == '__main__':
    app.run(debug=True)