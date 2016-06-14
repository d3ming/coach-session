import React, {PropTypes} from 'react';
import Session from './Session';
import _ from 'lodash';

var SessionList = React.createClass({
  propTypes: {
    sessionsList: PropTypes.array,
  },
  getInitialState: function() {
    return {
      sessionsList: this.props.sessionsList
    }
  },

  handleSelectSession: function(sessionId, eventKey) {
    var requestUrl = '/api/v1/sessions/' + sessionId,
      newSessionsList = this.state.sessionsList;
    console.log('Selected session with id, event: ', sessionId, eventKey);

    if (eventKey == 1)
    {
      // Handle DELETE

      fetch (requestUrl, {
        method: 'DELETE'
      }).then(
          function(response) {
            if (response.status != 204) {
              console.log('Error deleting sessions! Status: ', response.status);
          }

          console.log('Delete success for {sessionId, newSessionsList}', sessionId, newSessionsList);
          _.remove(newSessionsList, function(session) {
            return session.id == sessionId;
          });
          this.setState({
            sessionsList: newSessionsList
          });
        }.bind(this)
      );
    }
  },

  render: function() {
    console.log('SessionList::sessionsList: ', this.props.sessionsList);

    var sessionKey = 0,
      sessionsList = this.state.sessionsList.map(function(session) {
      sessionKey += 1;
      var sessionLabel = session.date + " @ " + session.time,
        sessionId = session.id;

      console.log('SessionList: map->sessionid: ', sessionId);
      return (
              <Session key={sessionKey}
                sessionLabel={sessionLabel}
                sessionId={sessionId}
                onSessionSelect={this.handleSelectSession}
              />
              );
    }.bind(this));

    return(
          <div className="sessionsList">
            <h2>Booked Sessions</h2>
              {sessionsList}
            <h2></h2>
          </div>
      )
    }
});

module.exports = SessionList;
