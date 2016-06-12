import React, {PropTypes} from 'react';
import Session from './Session';

var SessionList = function(props) {
  console.log('SessionList::sessionsList: ', props.sessionsList);

  var sessionsList = props.sessionsList.map(function(session) {
    var sessionLabel = session.date + " @ " + session.time;
    console.log('session', session);
    return (
            <Session key={sessionLabel}
              sessionLabel={sessionLabel}
            />
            );
  });

  return (
          <div className="sessionsList">
            <h2>Current Sessions</h2>
              {sessionsList}
            <h2></h2>
          </div>
          )
}

SessionList.propTypes = {
    sessionsList: PropTypes.array,
  },


module.exports = SessionList;
