import React, {PropTypes} from 'react';

import Select from 'react-select';

var TimeSelect = React.createClass({
  propTypes:  {
    onChange: PropTypes.func.isRequired,
    timeSelected: PropTypes.object
    // dateSelected: 
  },

  render: function() {
    return (
            <Select
                name="form-field-name"
                autosize={true}
                placeholder="Select a time slot"
                value={this.props.timeSelected}
                options={this.props.timeOptions}
                onChange={this.props.onChange}
                disabled={this.props.dateSelected == null}
            />
            );
    }
});

module.exports = TimeSelect;
