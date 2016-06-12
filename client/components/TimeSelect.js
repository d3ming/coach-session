import React, {PropTypes} from 'react';

import Select from 'react-select';

var TimeSelect = function(props) {
      return props.dateSelected == null
        ? <div></div>
        :
        <Select
            name="form-field-name"
            autosize={true}
            placeholder="Select a time slot"
            value={props.timeSelected}
            options={props.timeOptions}
            onChange={props.onChange}
            disabled={props.dateSelected == null}
        />
}

TimeSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    timeSelected: PropTypes.object,
    timeOptions: PropTypes.array.isRequired
    // dateSelected: 
  },


module.exports = TimeSelect;
