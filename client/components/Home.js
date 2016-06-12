import React from 'react';
import MainContainer from './MainContainer';
import SessionList from './SessionList';
import BookSessionButton from './BookSessionButton';
import _ from "lodash";
import Loading from "./Loading"

// TOOD: Figure out if this is the right place
import 'react-select/dist/react-select.css';
import 'react-infinite-calendar/styles.css';
import 'react-select/dist/react-select.css';

// TODO: Refactor to home container
var Home = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    // Get all the session data for a given coach
    // TODO: Better URL format + refactor date format string
    var requestUrl = '/api/v1/sessions?coachId=' + this.state.coachId,
      fakeSessionsData = {
        "default-coach_1465628400000T8": {
            "clientName": "Dong Ming", 
            "clientPhone": "425-999-9457", 
            "coachId": "default-coach", 
            "date": "2016-06-11", 
            "time": "8"
        }, 
        "default-coach_1467010800000T15": {
            "clientName": "Dong Ming", 
            "clientPhone": "425-999-9457", 
            "coachId": "default-coach", 
            "date": "2016-06-27", 
            "time": "15"
        }, 
        "default-coach_1467097200000T9": {
            "clientName": "Dong Ming", 
            "clientPhone": "425-999-9457", 
            "coachId": "default-coach", 
            "date": "2016-06-28", 
            "time": "9"
        }, 
        "default-coach_1467270000000T8": {
            "clientName": "Dong Ming", 
            "clientPhone": "425-999-9457", 
            "coachId": "default-coach", 
            "date": "2016-06-30", 
            "time": "8"
        }
      };
    
    fetch(requestUrl)
      .then(
            function(response) {
              if (response.status != 200) {
                console.log('Error getting sessions! Status: ', response.status);

                // TODO: Remove - testing frontend only
                console.log('Setting fake sessions data: ', fakeSessionsData)
                this.setState({
                  "sessionsList": _.toArray(fakeSessionsData),
                  "isLoading": false
                });
                return;
              }

              response.json().then(function(sessionsData) {
                // data contains list of sessions
                if (!sessionsData) {
                  // TODO: Check correct session data format
                  return;
                }

                console.log('Got sessionsData: ', sessionsData);
                this.setState({
                  "sessionsList": _.toArray(sessionsData),
                  "isLoading": false
                });
              }.bind(this));
            }.bind(this));
  },

  getInitialState: function() {
    // TODO: Fix duplicates
    return {
      isLoading: true,
      sessionsData: {},
      coachId: "default-coach"
    }
  },

  render: function() {
      return this.state.isLoading == true
        ? <Loading />
        :
      <MainContainer>
          <SessionList sessionsList={this.state.sessionsList} />
          <BookSessionButton />
      </MainContainer>
  }
});

module.exports = Home;
