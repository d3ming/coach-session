import React, {PropTypes} from 'react';

var Session = function(props) {
    return (
            <div>
              <p></p>
              <button type="button" className="btn btn-secondary">{props.sessionLabel}</button>
            </div>
          );
}

Session.propTypes = {
    sessionData: PropTypes.object,
    sessionLabel: PropTypes.string.isRequired,
  },


module.exports = Session;
