"""
Handles GET, POST of appointments

Routes:
GET /api/v1/appointments/:id
POST /api/v1/appointments/:id
GET /api/v1/appointments?coachid=d3ming&date=2016-06-06&time=11

The :id in this case is an unique identifier with the
following format: `coachid_2016-06-06_10`
"""
from flask_restful import Resource, abort, reqparse


# TODO: Super hacky way to store data
SESSION_DATA = {
    'd3ming_2016-06-06T10': {
        "coachId": "d3ming",
        "clientPhone": "425-999-9457",
        "clientName": "Dong Ming",
        "time": "10",
        "date": "2016-06-06"
    },
    'coach1_2016-06-06T10': {
        "coachId": "coach1",
        "clientPhone": "425-999-9457",
        "clientName": "Dong Ming",
        "time": "10",
        "date": "2016-06-06"
    },
    'coach2_2016-06-06T10': {
        "clientPhone": "425-999-9457",
        "coachId": "coach2",
        "time": "11",
        "date": "2016-06-23",
        "clientName": "Dong Ming"
    },
}


class Session(Resource):
    def __init__(self, sessions=None, args=None):
        if not sessions:
            # dependency injection
            sessions = SESSION_DATA
        self.sessions = sessions
        self.args = args

    def _parse_request_args(self):
        # TODO: Consider refactoring this out to server.py
        parser = reqparse.RequestParser()
        parser.add_argument('coachId')
        parser.add_argument('clientPhone')
        parser.add_argument('clientName')
        parser.add_argument('time')
        parser.add_argument('date')
        return parser.parse_args()

    def _handle_session_not_found(self, session_id):
        if session_id not in self.sessions:
            abort(404, message="Session {} doesn't exist".format(session_id))

    def get(self, session_id):
        self._handle_session_not_found(session_id)
        return self.sessions[session_id]

    def delete(self, session_id):
        self._handle_session_not_found(session_id)
        del self.sessions[session_id]
        return '', 204

    def put(self, session_id):
        # TODO: validate we have args first
        if not self.args:
            self.args = self._parse_request_args()
        session = {
            'coachId': self.args['coachId'],
            'clientPhone': self.args['clientPhone'],
            'clientName': self.args['clientName'],
            'date': self.args['date'],
            'time': self.args['time'],
        }
        self.sessions[session_id] = session
        return session, 201


class SessionList(Resource):
    def __init__(self, data=None):
        if not data:
            data = SESSION_DATA
        self.data = data

    def get(self):
        return self.data
