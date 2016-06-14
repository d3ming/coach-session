var React = require('react');
var Booking = require('./Booking');
import _ from 'lodash';
import $ from 'jquery'

var BookingContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    onBookSession: function(e) {
      e.preventDefault();
      var clientName = this.state.clientName,
          clientPhone = this.state.clientPhone,
          coachId = "default-coach", // TODO: set state
          sessionDate = this.state.dateSelected,
          sessionTime = this.state.timeSelected.value,
          sessionId = coachId + "_" + sessionDate + "T" + sessionTime,
          session = {
            "clientName": clientName,
            "clientPhone": clientPhone,
            "coachId": coachId,
            "id": sessionId,
            "date": sessionDate.format("YYYY-MM-DD"),
            "time": this.state.timeSelected.value
          };
      console.log('Booked session!  ', session);

      // TODO: Use fetch instead
      $.ajax({
        url: '/api/v1/sessions/' + sessionId,
        dataType: 'json',
        type: 'PUT',
        data: session,
        success: function(data) {
          console.log('Successfully booked session, data: ', data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('Error booking session! Error: ', err);
        }.bind(this)
      });
      this.context.router.push({
        pathname: '/'
      });
    },
    onTimeSelect: function(time) {
      this.setState({timeSelected: time})
    },

    defaultTimeOptions: [
            { value: '8', label: '8AM'},
            { value: '9', label: '9AM' },
            { value: '10', label: '10AM' },
            { value: '11', label: '11AM' },
            { value: '12', label: '12PM' },
            { value: '13', label: '1PM' },
            { value: '14', label: '2PM' },
            { value: '15', label: '3PM' },
            { value: '16', label: '4PM' },
          ],

    getTimeOptions: function(disabledTimes) {
        var timeOptions = _(this.defaultTimeOptions).forEach(function(timeSlot) {
          // Disable timeslots that are taken
          if (_.includes(disabledTimes, timeSlot['value'])) {
            console.log('Disabling time slot: ', timeSlot);
            timeSlot['disabled'] = true;
          }
          else {
            timeSlot['disabled'] = false;
          }
      });
      return timeOptions;
    },

    onDateSelect: function(date) {
      // Set disabled times based on previously booked appointments
      // TODO: Better URL format + refactor date format string
      var disabledTimes = [],
        sessionsData = this.state.sessionsData,
        timeOptions,
        sessionsForDate;

      if (!sessionsData) {
        // TODO: Check correct session data format
        // Don't disable any times
        return;
      }

      // Filter sessionsData to the specific date selected
      sessionsForDate = _.filter(sessionsData, 
      {
        'date': date.format("YYYY-MM-DD")
      });
      console.log('Got sessions for selected date: ', sessionsForDate);

      _.forEach(sessionsForDate, function(session) {
        disabledTimes.push(session['time']);
      });
      console.log('Got disabled times: ', disabledTimes);
      timeOptions = this.getTimeOptions(disabledTimes);
      console.log('Got time options: ', timeOptions);
      this.setState({timeOptions: timeOptions});

      // When date get selected, the time select gets enabled
      this.setState({dateSelected: date});
    },
    onUpdateClientName: function(e) {
        this.setState({
            clientName: e.target.value
        });
    },
    onUpdateClientPhone: function(e) {
        this.setState({
            clientPhone: e.target.value
        });
    },

    getInitialState: function() {
        return {
            // TOOD: hook up real data
            clientName: "Dong Ming",
            clientPhone: "425-999-9457",
            coachId: "default-coach",
            dateSelected: {},
            timeSelected: null,
            sessionsData: {},
            timeOptions: this.defaultTimeOptions
        }
    },

    componentDidMount: function() {
      // Get all the session data for a given coach
      // TODO: Better URL format + refactor date format string
      var requestUrl = '/api/v1/sessions?coachId=' + this.state.coachId,
        fakeSessionsData = {
          'd3ming_2016-06-06T10': {
              "coachId": "default-coach",
              "clientPhone": "425-999-9457",
              "clientName": "Dong Ming",
              "time": "10",
              "date": "2016-07-06"
          },
          'coach1_2016-06-06T10': {
              "coachId": "coach1",
              "clientPhone": "425-999-9457",
              "clientName": "Dong Ming",
              "time": "10",
              "date": "2016-07-06"
          },
          'coach2_2016-06-06T10': {
              "clientPhone": "425-999-9457",
              "coachId": "default-coach",
              "time": "11",
              "date": "2016-06-23",
              "clientName": "Dong Ming"
          }
        };
      
      fetch(requestUrl)
        .then(
              function(response) {
                if (response.status != 200) {
                  console.log('Error getting sessions! Status: ', response.status);

                  // TODO: Remove - testing frontend only
                  console.log('Setting fake sessions data: ', fakeSessionsData)
                  this.setState({"sessionsData": fakeSessionsData});
                  return;
                }

                response.json().then(function(sessionsData) {
                  // data contains list of sessions
                  if (!sessionsData) {
                    // TODO: Check correct session data format
                    // Don't disable any times
                    return;
                  }

                  console.log('Got sessionsData: ', sessionsData);
                  this.setState({"sessionsData": sessionsData});
                }.bind(this));
              }.bind(this));
    },

    render: function() {
        return (
            <Booking 
                clientName={this.state.clientName}
                clientPhone={this.state.clientPhone}
                onDateSelect={this.onDateSelect}
                onUpdateClientName={this.onUpdateClientName}
                onUpdateClientPhone={this.onUpdateClientPhone}
                onBookSession={this.onBookSession}
                dateSelected={this.state.dateSelected}
                onTimeSelect={this.onTimeSelect}
                timeSelected={this.state.timeSelected}
                timeOptions={this.state.timeOptions}
            />
        );
    }
});

module.exports = BookingContainer;
