import React, {PropTypes} from 'react';
import TimeSelect from './TimeSelect'
import { ButtonToolbar, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import MainContainer from './MainContainer';
import DateSelect from './DateSelect';

var Booking = function(props) {
    return (  
      <MainContainer>
          <h2>Book Coaching Session</h2>

          <div className="col-sm-12 text-left">
              <form onSubmit={props.onBookSession}>
                <p/>
                <FormGroup controlId="formClientInfo">
                  <ControlLabel>Name:</ControlLabel>
                  <FormControl
                      type="text"
                      value={props.clientName}
                      onChange={props.onUpdateClientName}
                      placeholder="Name" />
                  <p/>
                  <ControlLabel>Phone:</ControlLabel>
                  <FormControl
                      type="text"
                      value={props.clientPhone}
                      onChange={props.onUpdateClientPhone}
                      placeholder="Phone Number"/> 
                </FormGroup>

                <FormGroup controlId="formDateTime">
                  <ControlLabel>Date: </ControlLabel>
                  <DateSelect
                    dateSelected={props.dateSelected}
                    onDateSelect={props.onDateSelect}
                  /><p/>
                  <TimeSelect
                    onChange={props.onTimeSelect}
                    timeSelected={props.timeSelected}
                    dateSelected={props.dateSelected} // TODO: Refactor for disabled
                    timeOptions={props.timeOptions}
                  />
                </FormGroup>

                <div className="text-center">
                  <ButtonToolbar>
                    <Button
                        bsStyle="success"
                        bsSize="large"
                        type="submit">
                            Book!
                    </Button>
                    <Button type="submit"
                            bsSize="large"
                            href="/">
                            Cancel
                    </Button>
                  </ButtonToolbar>
                </div>
            </form>
          </div>
      </MainContainer>
            )
}

Booking.propTypes = {
  clientName: PropTypes.string.isRequired,
  clientPhone: PropTypes.string.isRequired,
  onDateSelect: PropTypes.func.isRequired,
  onUpdateClientName: PropTypes.func.isRequired,
  onUpdateClientPhone: PropTypes.func.isRequired,
  onBookSession: PropTypes.func.isRequired,
  //dateSelected: PropTypes.number.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
  timeSelected: PropTypes.object
}

module.exports = Booking;
