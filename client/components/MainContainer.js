import React, {PropTypes} from 'react';
import {transparentBg} from '../styles';

function MainContainer(props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
        {props.children}
    </div>
    );
}

MainContainer.propTypes = {
  children: PropTypes.array.isRequired,
}

module.exports = MainContainer;
