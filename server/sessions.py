"""
Handles GET, POST of appointments

Routes:
GET /api/v1/sessions/:id
POST /api/v1/sessions/:id
GET /api/v1/sessions?coachid=coach1&date=2016-06-06&time=11
"""
import logging
import json
from flask_restful import Resource, abort, reqparse
import os

# TODO: Set to higher for release
logging.basicConfig(level=logging.DEBUG)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'sessions.json')
INITIAL_DATA = {
    "default-coach_1467270000000T8": {
        "clientName": "Dong Ming",
        "clientPhone": "425-999-9457",
        "coachId": "default-coach",
        "date": "2016-06-30",
        "time": "8"
    }
}


def parse_request_args():
    # TODO: Consider refactoring this out to server.py
    parser = reqparse.RequestParser()
    parser.add_argument('coachId')
    parser.add_argument('clientPhone')
    parser.add_argument('clientName')
    parser.add_argument('time')
    parser.add_argument('date')
    return parser.parse_args()


def get_filtered_sessions(key, value, data):
    result = {}
    for s_id in data:
        session = data[s_id]
        if session[key] == value:
            result[s_id] = session
    return result


def load_sessions_data(data_filename=DATA_FILE):
    if not os.path.exists(DATA_FILE):
        return INITIAL_DATA

    with open(data_filename) as fp:
        data = json.load(fp)
        logging.debug('Loaded session data: %s', data)
    return data


class Session(Resource):
    def __init__(self, sessions=None, args=None, test_mode=False):
        if not sessions:
            # dependency injection
            sessions = load_sessions_data()
        self.sessions = sessions
        self.args = args
        self.test_mode = test_mode

    def save_sessions_data(self, data_filename=DATA_FILE):
        with open(data_filename, 'w') as fp:
            if not self.test_mode:
                # Don't bother saving file for tests
                json.dump(self.sessions, fp)
                logging.debug('Saved sessions data: %s', self.sessions)

    def _handle_session_not_found(self, session_id):
        if session_id not in self.sessions:
            abort(404, message="Session {} doesn't exist".format(session_id))

    def get(self, session_id):
        self._handle_session_not_found(session_id)
        return self.sessions[session_id]

    def delete(self, session_id):
        self._handle_session_not_found(session_id)
        del self.sessions[session_id]
        self.save_sessions_data()
        return '', 204

    def put(self, session_id):
        # TODO: validate we have args first
        if not self.args:
            self.args = parse_request_args()
        session = {
            'coachId': self.args['coachId'],
            'clientPhone': self.args['clientPhone'],
            'clientName': self.args['clientName'],
            'date': self.args['date'],
            'time': self.args['time'],
        }
        self.sessions[session_id] = session
        self.save_sessions_data()
        return session, 201


class SessionList(Resource):
    def __init__(self, data=None, args=None):
        if not data:
            data = load_sessions_data()
        self.data = data
        self.args = args
        self.logger = logging.getLogger('sessions')

    def __get_valid_args(self):
        supported_args = ['date', 'time', 'coachId']
        if not self.args:
            return None

        valid_args = []
        for arg in self.args:
            if arg in supported_args and self.args[arg] is not None:
                # ensure that we got valid args and that it has some value
                valid_args.append(arg)

        return valid_args

    def filter_sessions_with_args(self, args):
        result = {}

        logging.debug('filter_sessions_with_args got args: %s', args)
        for key in args:
            # First iteration, use full data.  Otherwise use filtered data
            if not result:
                result = self.data

            value = self.args[key]
            self.logger.debug('Filtering %s with key/value:  (%s, %s)',
                              result, key, value)
            result = get_filtered_sessions(key, value, result)
            logging.debug("filter_sessions_with_args result from %s: %s",
                          key, result)
            if len(result) == 0:
                logging.debug(
                    "No result found after filtering for %s=%s", key, value)
                break

        return result

    def get(self):
        if self.args is None:
            # Default case where we aren't doing dependency injection
            self.args = parse_request_args()

        self.logger.info('GET sessions args: %s', self.args)
        valid_args = self.__get_valid_args()
        if not valid_args:
            # TODO: Decide if this is correct
            self.logger.debug('No args with values')
            return self.data, 200

        result = self.filter_sessions_with_args(args=valid_args)
        self.logger.debug('GET sessions - result: %s', result)
        return result, 200
