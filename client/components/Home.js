import React from 'react';
import MainContainer from './MainContainer';
import { Link } from 'react-router';

// TOOD: Figure out if this is the right place
import 'react-select/dist/react-select.css';
import 'react-infinite-calendar/styles.css';
import 'react-select/dist/react-select.css';


// TODO: Refactor to home container
var Home = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      'userToken': '',
      'name': '',
      'id': '',
    }
  },
  render: function() {
    return (
      <MainContainer>
          <h1>Coach Session</h1>
          <h2>Sessions... (WIP)</h2>
          <p className='lead'>Book today!</p>

        <div className='col-sm-12'>
            <Link to='/booking'>
                <button type='button' className='btn btn-lg btn-danger'>Book Session!</button>
            </Link>
        </div>  


      </MainContainer>
    );
  }
});

module.exports = Home;
