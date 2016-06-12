from flask import Flask
from flask_restful import Api
from server.sessions import Session, SessionList
import os

app = Flask(__name__, static_url_path='', static_folder='dist')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
api = Api(app)

# API
api.add_resource(SessionList, '/api/v1/sessions')
api.add_resource(Session, '/api/v1/sessions/<session_id>')


if __name__ == '__main__':
    port = int(os.environ.get('PORT') or 3333)
    app.run(port=port)
