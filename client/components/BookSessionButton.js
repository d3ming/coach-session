import React from 'react';
import { Link } from 'react-router';


var BookSessionButton = function() {
    return (
            <div className='col-sm-12'>
                <Link to='/booking'>
                    <button type='button' className='btn btn-lg btn-primary'>Book Session!</button>
                </Link>
            </div>
          );
}

module.exports = BookSessionButton;
