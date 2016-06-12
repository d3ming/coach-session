"""
Handles GET, POST of appointments

Routes:
GET /api/v1/sessions/:id
POST /api/v1/sessions/:id
GET /api/v1/sessions?coachid=coach1&date=2016-06-06&time=11
"""
import logging
from flask_restful import Resource, abort, reqparse

# TODO: Set to higher for release
logging.basicConfig(level=logging.DEBUG)

# TODO: Super hacky way to store data
SESSION_DATA = {
    'd3ming_2016-06-06T10': {
        "coachId": "default-coach",
        "clientPhone": "425-999-9457",
        "clientName": "Dong Ming",
        "time": "10",
        "date": "2016-07-06"
    },
    'coach1_2016-06-06T10': {
        "coachId": "coach1",
        "clientPhone": "425-999-9457",
        "clientName": "Dong Ming",
        "time": "10",
        "date": "2016-07-06"
    },
    'coach2_2016-06-06T10': {
        "clientPhone": "425-999-9457",
        "coachId": "default-coach",
        "time": "11",
        "date": "2016-06-23",
        "clientName": "Dong Ming"
    },
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


class Session(Resource):
    def __init__(self, sessions=None, args=None):
        if not sessions:
            # dependency injection
            sessions = SESSION_DATA
        self.sessions = sessions
        self.args = args

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
            self.args = parse_request_args()
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
    def __init__(self, data=None, args=None):
        if not data:
            data = SESSION_DATA
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
            self.logger.debug('Got arg %s with value %s', key, value)
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
