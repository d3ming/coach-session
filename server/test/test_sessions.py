import pytest
from flask import Flask
from sessions import SessionList, Session

TEST_SESSION_DATA = {
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

TEST_APP = Flask(__name__)


@pytest.fixture
def test_sessions():
    return SessionList(data=TEST_SESSION_DATA)


@pytest.fixture
def test_session():
    return Session(sessions=TEST_SESSION_DATA)


def test_sessions_get():
    result = test_sessions().get()
    assert result == TEST_SESSION_DATA


def test_session_get():
    result = test_session().get('d3ming_2016-06-06T10')
    assert result == {
        "coachId": "d3ming",
        "clientPhone": "425-999-9457",
        "clientName": "Dong Ming",
        "time": "10",
        "date": "2016-06-06"
    }


def test_session_put():
    test_session_data = {
        "clientPhone": "425-999-9457",
        "coachId": "coach2",
        "time": "11",
        "date": "2016-06-23",
        "clientName": "Dong Ming"
    }
    test_put_session = Session(
        sessions=TEST_SESSION_DATA, args=test_session_data)
    with TEST_APP.test_request_context():
        response, status = test_put_session.put('test_put_id')
    assert response == test_session_data
    assert status == 201
    assert 'clientName' in response
    assert response['clientName'] == 'Dong Ming'


def test_session_delete():
    test_id = 'coach2_2016-06-06T10'
    assert test_id in test_session().sessions
    result = test_session().delete(test_id)
    assert result == ('', 204)
    assert test_id not in test_session().sessions


def test_sessions_get_404():
    bad_id = 'not_found_id'
    with pytest.raises(Exception):
        status, response = test_session().get(bad_id)
        assert status == 404
