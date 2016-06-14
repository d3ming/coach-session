import React, {PropTypes} from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

var Session =  React.createClass({
  propTypes: {
    sessionData: PropTypes.object,
    sessionId: PropTypes.string.isRequired,
    sessionLabel: PropTypes.string.isRequired,
    onSessionSelect: PropTypes.func.isRequired
  },

  handleSession: function(eventKey, event) {
    console.log('Event: ', event);
    console.log('EventKey', eventKey);

    // Callback to parent to handle the event
    this.props.onSessionSelect(this.props.sessionId, eventKey);
  },
  render: function() {
    return (
            <div>
              <p></p>
              <SplitButton title={this.props.sessionLabel}
                id={this.props.sessionId}
                onSelect={this.handleSession}>
                <MenuItem eventKey="1">Cancel</MenuItem>
              </SplitButton>
            </div>
          );
      }
});

module.exports = Session;
