import React, {PropTypes} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

var Session = function(props) {
    return (
            <div>
              <p></p>
              <DropdownButton title={props.sessionLabel} id={props.sessionLabel}>
                <MenuItem eventKey="1">Cancel</MenuItem>
              </DropdownButton>
            </div>
          );
}

Session.propTypes = {
    sessionData: PropTypes.object,
    sessionLabel: PropTypes.string.isRequired,
  },


module.exports = Session;
