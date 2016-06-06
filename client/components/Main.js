var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var Main;
import Topbar from './Topbar';

require('../main.css');

Main = React.createClass({
  render: function() {
    return (
        <div className='main-container'>
        <Topbar clientName="Dong Ming" />        
        <ReactCssTransitionGroup
          transitionName='appear'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
            {React.cloneElement(this.props.children,
            { key: this.props.location.pathname}) }
        </ReactCssTransitionGroup>
        </div>
    );
  },
});

module.exports = Main;
