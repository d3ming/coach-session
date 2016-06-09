var React = require('react');
var Booking = require('./Booking');

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
            "coachId": "d3ming",
            "date": sessionDate.format("YYYY-MM-DD"),
            "time": this.state.timeSelected.value
          };
      console.log('Booked session!  ', session);
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
    onDateSelect: function(date) {
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
            dateSelected: null,
            timeSelected: null
        }
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
            />
        );
    }
});

module.exports = BookingContainer;
