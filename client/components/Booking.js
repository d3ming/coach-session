import React, {PropTypes} from 'react';
import {transparentBg} from '../styles';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimeSelect from './TimeSelect'

require('react-datepicker/dist/react-datepicker.css');

// TODO: Add time selector
//import Select from 'react-select';

var Booking = function(props) {
    const calMinDate = moment();

    return (  

      <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
          <h1>Book Coaching Session</h1>

          <div className="col-sm-12">
              <form onSubmit={props.onBookSession}>

                <h3> Appointment Details:</h3>
                <div className="form-group">
                  Name: <input
                    type="text"
                    className="input-small"
                    value={props.clientName}
                    onChange={props.onUpdateClientName}
                    placeholder="Name" 
                    display="inline-block" /><p/>
                  Phone: <input
                    type="text"
                    className="input-small"
                    value={props.clientPhone}
                    onChange={props.onUpdateClientPhone}
                    placeholder="Phone Number" 
                    display="inline-block" /><p/>
                  Date: 
                    <DatePicker
                      selected={props.dateSelected}
                      minDate = {calMinDate}
                      placeholderText="Select a date" 
                      dateFormat="YYYY-MM-DD"
                      onChange={props.onDateSelect}
                    /><p/>
                  Time:
                    <TimeSelect
                      onChange={props.onTimeSelect}
                      timeSelected={props.timeSelected}
                    />
                </div>

                <div className="form-group col-sm-4 col-sm-offset-4">
                    <button
                        className="btn btn-block btn-success"
                        type="submit">
                            Book!
                    </button>
                </div>
            </form>
          </div>
      </div>
            )
}

Booking.propTypes = {
  clientName: PropTypes.string.isRequired,
  clientPhone: PropTypes.string.isRequired,
  onDateSelect: PropTypes.func.isRequired,
  onUpdateClientName: PropTypes.func.isRequired,
  onUpdateClientPhone: PropTypes.func.isRequired,
  onBookSession: PropTypes.func.isRequired,
  //dateSelected: PropTypes.date.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
  timeSelected: PropTypes.object
}

module.exports = Booking;
