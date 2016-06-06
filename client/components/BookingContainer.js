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
          sessionDate = this.state.dateSelected,
          appointment = {
            "clientName": clientName,
            "clientPhone": clientPhone,
            "date": sessionDate.format("YYYY-MM-DD"),
            "time": this.state.timeSelected.value
          };
      console.log('Booked appointment!  ', appointment);
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
