import React from 'react';
import { Link } from 'react-router';


var Topbar = function(props) {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
                <Link to='/'>
                  <button type="button" className="btn btn-default navbar-btn">Home</button>
                </Link>
            <span className="navbar-text navbar-right">Coach sessions for {props.clientName}</span>

            </div>
          </div>
        </nav>
            );
}

module.exports = Topbar;
