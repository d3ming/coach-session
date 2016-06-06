import React, {PropTypes} from 'react';

// Docs: https://github.com/JedWatson/react-select
import Select from 'react-select';


var TimeSelect = function(props) {
  var timeSlots = [
    { value: '8', label: '8AM', disabled: true},
    { value: '9', label: '9AM' },
    { value: '10', label: '10AM' },
    { value: '11', label: '11AM' },
    { value: '12', label: '12PM' },
    { value: '13', label: '1PM' },
    { value: '14', label: '2PM' },
    { value: '15', label: '3PM' },
    { value: '16', label: '4PM' },
  ];

  return (
          <Select
              name="form-field-name"
              autosize={true}
              placeholder="Select a time slot"
              value={props.timeSelected}
              options={timeSlots}
              onChange={props.onChange}
          />
          );
}

TimeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  timeSelected: PropTypes.object
}

module.exports = TimeSelect;
