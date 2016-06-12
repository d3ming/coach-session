import React, {PropTypes} from 'react';
import moment from 'moment';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

var DateSelect = function(props) {
      const calMinDate = moment();

      return (
                <InfiniteCalendar
                  showHeader={false}
                  width={360}
                  height={305}
                  selectedDate={props.dateSelected}
                  disabledDays={[0,6]}  // Disable weekends
                  minDate = {calMinDate}
                  placeholderText="Select a date" 
                  dateFormat="YYYY-MM-DD"
                  onSelect={props.onDateSelect}
                />
              )
}

DateSelect.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    dateSelected: PropTypes.object
  },


module.exports = DateSelect;
