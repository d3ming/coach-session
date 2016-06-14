import pytest
from flask import Flask
import sessions
from sessions import SessionList, Session
import os

TEST_APP = Flask(__name__)

TEST_FILE = os.path.join(os.path.dirname(__file__), 'test_sessions.json')
TEST_SESSION_DATA = sessions.load_sessions_data(TEST_FILE)


@pytest.fixture
def test_session_list():
    return SessionList(
        data=TEST_SESSION_DATA, args={})


@pytest.fixture
def test_session():
    return Session(sessions=TEST_SESSION_DATA, test_mode=True)


def test_sessions_get():
    res, status = test_session_list().get()
    assert res == TEST_SESSION_DATA


def test_sessions_get_date():
    sessions = test_session_list()
    sessions.args = {"date": "2016-06-06"}
    res, status = sessions.get()
    print (res, status)
    assert status == 200
    assert len(res) == 2
    assert "coach1_2016-06-06T10" in res
    assert "d3ming_2016-06-06T10" in res


def test_sessions_get_specific():
    sessions = test_session_list()
    sessions.args = {
        "date": "2016-06-06",
        "coachId": "d3ming",
        "time": "10"
    }
    res, status = sessions.get()
    assert len(res) == 1
    assert "d3ming_2016-06-06T10" in res


def test_sessions_get_notfound():
    sessions = test_session_list()
    sessions.args = {
        "coachId": "coach_not_found",
    }
    response, status = sessions.get()
    assert len(response) == 0, "We should return 404 when no result is found"


def test_sessions_get_compound():
    sessions = test_session_list()
    # There's a session with 'default-coach', but not with that date
    sessions.args = {
        "coachId": "default-coach",
        "date": "1467010800000"
    }
    response, status = sessions.get()
    assert len(response) == 0, "Should not have found a session!"

    # Test exact match of one
    sessions.args = {
        "clientName": "Dong Ming",
        "clientPhone": "425-999-9457",
        "coachId": "default-coach",
    }
    res, status = sessions.get()
    assert res == {"default-coach_1467270000000T8": {
        "id": "default-coach_1467270000000T8",
        "clientName": "Dong Ming",
        "clientPhone": "425-999-9457",
        "coachId": "default-coach",
        "date": "2016-06-30",
        "time": "8"
    }}


def test_sessions_get_none_value():
    # when arg values are None it should not be used as a filter
    sessions = test_session_list()
    sessions.args = {
        "date": "2016-06-06",
        "coachId": None,
        "time": None
    }
    res, status = sessions.get()
    assert len(res) == 2
    assert "coach1_2016-06-06T10" in res
    assert "d3ming_2016-06-06T10" in res


def test_sessions_no_params():
    # This is the default case when no params are set
    sessions = test_session_list()
    sessions.args = {
        "date": None,
        "coachId": None,
        "time": None,
        "bogusParam": None,
    }

    result = sessions.get()
    assert result == (TEST_SESSION_DATA, 200)


def test_session_get():
    result = test_session().get('d3ming_2016-06-06T10')
    assert result == {
        "id": "d3ming_2016-06-06T10",
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
        "clientName": "Dong Ming",
        "id": "coach2_2016-06-23T11"
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
    test_id = 'test_put_id'
    assert test_id in test_session().sessions
    result = test_session().delete(test_id)
    assert result == ('', 204)
    assert test_id not in test_session().sessions


def test_sessions_get_404():
    bad_id = 'not_found_id'
    with pytest.raises(Exception):
        status, response = test_session().get(bad_id)
        assert status == 404
